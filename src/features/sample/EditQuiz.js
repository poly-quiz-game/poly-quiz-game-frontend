import React from "react";
import { Button } from "antd";

import "./styles.scss";

const initialQuestions = [
  {
    question: "Câu hỏi 1",
    answers: ["Wrong Answer", "Correct Answer", "Wrong Answer", "Wrong Answer"],
    correctAnswer: 1,
    time: 30,
  },
  {
    question: "Câu hỏi 2",
    answers: ["Wrong Answer", "Correct Answer", "Wrong Answer", "Wrong Answer"],
    correctAnswer: 3,
    time: 30,
  },
  {
    question:
      "Replace this with a simple question. Use the language and vocabulary that you know will be used in the unit test?",
    answers: ["Wrong Answer", "Correct Answer", "Wrong Answer", "Wrong Answer"],
    correctAnswer: 0,
    time: 30,
  },
];

const EditQuiz = () => {
  const [questions, setQuestions] = React.useState(initialQuestions);

  const duplicateQuestion = (index) => {
    const questionToDuplicate = questions.find((qt, i) => index === i);
    let newQuestions = [...questions];
    newQuestions.splice(index, 0, questionToDuplicate);
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions.length === 1) return;
    const newQuestions = questions.filter((qt, i) => index !== i);
    setQuestions(newQuestions);
  };

  return (
    <div className="sample bg-gray-edit">
      <h3>Poly quiz! for formative assessment</h3>
      {questions.map((qt, index) => (
        <div className="bg-white-form" key={index}>
          <form className="form-edit">
            <label>{qt.question}</label>
            <div className="form-padding">
              {qt.answers.map((answer, i) => (
                <div className="answer" key={i}>
                  {qt.correctAnswer === i ? (
                    <div className="answer__box-success" />
                  ) : (
                    <div className="answer__box-wrong" />
                  )}
                  <div className="answer-px">{answer}</div>
                </div>
              ))}
            </div>
            <div className="btn">
              <Button>
                <i class="far fa-clock"></i> {qt.time} giây
              </Button>
              <Button
                className="btn-mx"
                onClick={() => duplicateQuestion(index)}
              >
                <i class="far fa-copy"></i> Nhân bản
              </Button>
              <Button onClick={() => deleteQuestion(index)}>
                <i class="far fa-trash-alt"></i> Xóa
              </Button>
            </div>
          </form>
        </div>
      ))}

      <div className="add-answer">
        <Button>
          <i class="fas fa-plus"></i>Thêm câu hỏi
        </Button>
      </div>
    </div>
  );
};

export default EditQuiz;
