import React from "react";
import { Button } from "antd";

import "./styles.scss";

const initialQuestions = [
  {
    question: "Câu hỏi 1",
    answers: ["Wrong Answer", "Correct Answer", "Wrong Answer", "Wrong Answer"],
    correctAnswer: 0,
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

const state = {
  questions: initialQuestions,
  title: "Title",
};

const EditQuiz = () => {
  const [questions, setQuestions] = React.useState(initialQuestions);

  const duplicateQuestion = (index) => {
    // Tìm đến câu hỏi cần nhân bản theo index
    const questionToDuplicate = questions.find((qt, i) => index === i);
    let newQuestions = [...questions];
    // Chèn câu hỏi cần nhân bản vào mảng questions
    newQuestions.splice(index, 0, questionToDuplicate);

    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    // Nếu chỉ còn lại 1 câu hỏi thì ko làm gì
    if (questions.length === 1) return;
    // Lọc ra các câu hỏi không có index trùng với index cần xoá, (index - thứ thự trong array)
    const newQuestions = questions.filter((qt, i) => index !== i);
    setQuestions(newQuestions);
  };

  return (
    <div className="sample bg-gray-edit">
      <h3>Poly quiz! for formative assessment</h3>
      {/* Map câu hỏi ra giao diện */}
      {questions.map((qt, index) => (
        <div className="bg-white-form" key={index}>
          <form className="form-edit">
            {/* Câu hỏi */}
            <label>{qt.question}</label>
            <div className="form-padding">
              {/* Map câu trả lời ra giao diện */}
              {qt.answers.map((answer, i) => (
                <div className="answer" key={i}>
                  {/* Kiểm tra điều hiện có phải câu trả lời đúng */}
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
                {/* Hiển thị thời gian câu hỏi */}
                <i class="far fa-clock"></i> {qt.time} giây
              </Button>
              {/* Nút Nhân bản câu hỏi */}
              <Button
                className="btn-mx"
                onClick={() => duplicateQuestion(index)}
              >
                <i class="far fa-copy"></i> Nhân bản
              </Button>
              {/* Nút Xoá câu hỏi */}
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
