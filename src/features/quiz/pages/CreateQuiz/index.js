import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import QuestionOption from "./QuestionOption";
import ListQuestions from "./ListQuestions";
import QuestionBody from "./QuestionBody";
import QuizSettingModal from "./QuizSettingModal";
import { Button } from "antd";
import { fetchCreateQuiz } from "../../../hostScreen/quizSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ValidateQuizModal from "./ValidateQuizModal";

const defaultQuestion = {
  type: "quiz",
  image: "",
  answers: ["", "", "", ""],
  time: 20000,
  question: "",
  correctAnswer: null,
};

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [questions, setQuestions] = useState([defaultQuestion]);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [quiz, setQuiz] = useState({ name: "" });
  const [input, setInput] = useState();
  const [isShowValidateModal, setIsShowValidateModal] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const errs = questions.map((question) => {
      const err = {};
      if (!question.question) {
        err.question = "Thiếu câu hỏi";
      }
      if (!question.answers.every((answer) => answer)) {
        err.answers = "Thiếu đáp án";
      }
      if (typeof question.correctAnswer !== "number") {
        err.correctAnswer = "Chưa chọn đáp án đúng";
      }
      return err;
    });
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
    if (activeQuestion === index) setActiveQuestion(activeQuestion - 1);
    setQuestions(questions.filter((q, i) => i !== index));
  };

  const onChangeQuestionType = (type) => {
    setQuestions(
      questions.map((q, index) =>
        index === activeQuestion ? { ...questions[index], type } : q
      )
    );
  };

  const onChangeQuestionTime = (value) => {
    setQuestions(
      questions.map((q, index) =>
        index === activeQuestion ? { ...questions[index], time: value } : q
      )
    );
  };

  const onChangeQuestion = (question) => {
    setQuestions(
      questions.map((q, index) => (index === activeQuestion ? question : q))
    );
  };

  const submitQuestions = async ({ name }) => {
    if (errors.length) {
      setIsShowValidateModal(true);
      return;
    }
    if (!quiz.name && !name) {
      setIsShowSetting("save");
      return;
    }
    const newQuiz = { name: name || quiz.name, questions };
    await dispatch(fetchCreateQuiz(newQuiz));
    navigate("/quiz");
  };

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
            <Button type="primary" onClick={submitQuestions}>
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
        />
        <QuestionBody
          question={questions[activeQuestion]}
          onChangeQuestion={onChangeQuestion}
        />
        <QuestionOption
          onChangeQuestionType={onChangeQuestionType}
          onChangeQuestionTime={onChangeQuestionTime}
          question={questions[activeQuestion]}
          deleteQuestion={deleteQuestion}
        />
      </div>
      <QuizSettingModal
        isShowSetting={isShowSetting}
        setIsShowSetting={setIsShowSetting}
        submitQuestions={submitQuestions}
        input={input}
        setInput={setInput}
        setQuiz={setQuiz}
      />
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
