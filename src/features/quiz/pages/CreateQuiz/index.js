import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import ListQuestions from "./ListQuestions";
import QuestionBody from "./QuestionBody";
import QuizSettingModal from "./QuizSettingModal";
import { fetchCreateQuiz, fetchQuiz } from "../../../hostScreen/quizSlice";
import ValidateQuizModal from "./ValidateQuizModal";
import { questionTypes } from "consts";
import { validateQuestion } from "./utils";

const defaultQuestion = {
  type: questionTypes.SINGLE_CORRECT_ANSWER,
  image: "",
  answers: ["", "", "", ""],
  timeLimit: 20000,
  question: "",
  correctAnswer: "",
};

const quizzes = [
  {
    type: questionTypes.MULTIPLE_CORRECT_ANSWER,
    image:
      "https://res.cloudinary.com/poly-quiz/image/upload/v1644943191/qbzcodre7o5oolkge8vg.jpg",
    answers: [
      "Tương tự lửa chùa",
      "Quiz Online",
      "Game online",
      "Một game thẻ bài",
    ],
    timeLimit: 20000,
    question: "Poly Quiz là gì?",
    correctAnswer: "1|2",
  },
  {
    type: questionTypes.SINGLE_CORRECT_ANSWER,
    image:
      "https://res.cloudinary.com/poly-quiz/image/upload/v1644943362/um2zps8vmja8z9a6wdyo.jpg",
    answers: ["Đáp án sai", "Sai", "Cái này đúng", "Sai nhé!"],
    timeLimit: 20000,
    question: "Câu hỏi thứ hai",
    correctAnswer: "2",
  },
  {
    type: questionTypes.TRUE_FALSE_ANSWER,
    image:
      "https://res.cloudinary.com/poly-quiz/image/upload/v1644943191/qbzcodre7o5oolkge8vg.jpg",
    answers: ["Đáp án đúng", "Sai bét", "Cái này ko đúng", "Sai nhé!"],
    timeLimit: 20000,
    question: "Câu hỏi thứ ba",
    correctAnswer: "0",
  },
];

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, setQuestions] = useState(quizzes);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [quiz, setQuiz] = useState({
    name: "",
    coverImage: "",
    backgroundImage: "",
    needLogin: false,
    music: "",
    numberOfPlayer: 10,
  });
  const [isShowValidateModal, setIsShowValidateModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  let params = useParams();

  useEffect(() => {
    const errs = questions.map(validateQuestion);
    setErrors(errs);
  }, [questions]);

  const addQuestion = (question) => {
    const newQuestions = [...questions];
    newQuestions.splice(activeQuestion + 1, 0, question || defaultQuestion);

    setQuestions(newQuestions);
    setActiveQuestion(activeQuestion + 1);
  };

  const deleteQuestion = (index) => {
    if (questions.length === 1) return;
    if (activeQuestion === index && activeQuestion > 0)
      setActiveQuestion(activeQuestion - 1);
    setQuestions(questions.filter((q, i) => i !== index));
  };

  const onChangeQuestion = (question) => {
    setQuestions(
      questions.map((q, index) => (index === activeQuestion ? question : q))
    );
  };

  const submitCreateQuiz = async (customData = {}) => {
    if (errors.filter((e) => !_.isEmpty(e)).length) {
      setIsShowValidateModal(true);
      return;
    }
    if (!quiz.name && !customData.name) {
      setIsShowSetting("save");
      return;
    }
    const newQuiz = { ...quiz, questions, ...customData };

    try {
      await dispatch(fetchCreateQuiz(newQuiz)).unwrap();
      navigate("/quiz");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   dispatch(fetchQuiz(params.id));
  // }, [dispatch, params]);

  return (
    <div className="create-quiz">
      <div className="header">
        <div className="header-content">
          <div className="left">
            <div className="logo">LOGO</div>
            <div className="quiz-settings">
              <div className={`${!quiz.name ? "blured" : ""} quiz-name`}>
                {quiz.name || "Nhập tên quiz"}
              </div>
              <Button
                className="setting-button"
                onClick={() => setIsShowSetting(true)}
              >
                Cài đặt
              </Button>
            </div>
          </div>
          <div className="right-buttons">
            <Link to="/quiz">
              <Button>Thoát</Button>
            </Link>
            <Button type="primary" onClick={() => submitCreateQuiz()}>
              Lưu
            </Button>
          </div>
        </div>
      </div>
      <div className="body">
        <ListQuestions
          questions={questions}
          question={questions[activeQuestion]}
          addQuestion={addQuestion}
          deleteQuestion={deleteQuestion}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
          errors={errors}
          setQuestions={setQuestions}
        />
        <QuestionBody
          question={questions[activeQuestion]}
          onChangeQuestion={onChangeQuestion}
          deleteQuestion={deleteQuestion}
        />
      </div>
      <Modal
        title="Cài đặt Quiz"
        visible={isShowSetting}
        onCancel={() => setIsShowSetting(false)}
        okButtonProps={{
          form: "quizSettingForm",
          key: "submit",
          htmlType: "submit",
        }}
        className="quiz-setting-modal"
        okText="Lưu"
        cancelText="Đóng"
      >
        <QuizSettingModal
          isShowSetting={isShowSetting}
          setIsShowSetting={setIsShowSetting}
          submitCreateQuiz={submitCreateQuiz}
          quiz={quiz}
          setQuiz={setQuiz}
        />
      </Modal>
      <ValidateQuizModal
        isShowValidateModal={isShowValidateModal}
        setIsShowValidateModal={setIsShowValidateModal}
        errors={errors}
        questions={questions}
        setActiveQuestion={setActiveQuestion}
      />
    </div>
  );
};

export default CreateQuiz;
