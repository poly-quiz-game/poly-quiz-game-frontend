import React, { useState } from "react";
import { useDispatch } from "react-redux";

import QuestionOption from "./QuestionOption";
import ListQuestions from "./ListQuestions";
import QuestionBody from "./QuestionBody";
import { Button, Modal, Form, Input } from "antd";
import { fetchCreateQuiz } from "../../../hostScreen/quizSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const arr = [
  {
    type: "quiz",
    image: "",
    answers: ["Câu trả lời đúng", "Câu trả lời sai", "Sai", "Vẫn sai"],
    time: 20000,
    question: "Câu hỏi số 1?",
    correctAnswer: 0,
  },
  {
    type: "quiz",
    image: "",
    answers: ["Câu trả lời sai", "Câu trả lời sai", "Đúng", "Vẫn sai"],
    time: 20000,
    question: "Câu hỏi số 2?",
    correctAnswer: 2,
  },
  {
    type: "quiz",
    image: "",
    answers: ["Câu trả lời sai", "Câu trả lời sai", "Sai", "Đúng"],
    time: 60000,
    question: "Câu hỏi số 3?",
    correctAnswer: 3,
  },
];

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

  const navigate = useNavigate();

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
      <Modal
        title="Cài đặt Quiz"
        visible={isShowSetting}
        onCancel={() => setIsShowSetting(false)}
        footer={null}
      >
        <Form
          name="quiz-setting"
          initialValues={{ remember: true }}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="Tên quiz"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
              if (isShowSetting === "save") {
                submitQuestions({ name: input });
                return;
              }
              setQuiz((q) => ({ ...q, name: input }));
              setIsShowSetting(false);
            }}
          >
            Lưu
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateQuiz;
