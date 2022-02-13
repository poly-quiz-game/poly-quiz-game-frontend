import React from "react";
import { Button, Input, Switch } from "antd";

const QUESTION_LABELS = ["A", "B", "C", "D"];

const QuestionBody = ({ question, onChangeQuestion }) => {
  return (
    <div className="question-body-container">
      <div className="question-body">
        <div className="question-body-question">
          <Input
            value={question.question}
            onChange={(e) =>
              onChangeQuestion({ ...question, question: e.target.value })
            }
          />
        </div>
        <div className="question-body-image">
          <div className="time">
            <div className="time-value">
              Thời gian: {question.time / 1000} giây
            </div>
          </div>
          <div className="image">
            <img src="https://i.picsum.photos/id/859/632/336.jpg?hmac=NHCRpqHlkp1TFiYXsrC0BLfgKsnQcJ0yo2ZwunPOreg" />
            <div className="image-actions">
              <Button>Thay ảnh</Button>
              <Button>Xoá</Button>
            </div>
          </div>
        </div>
        <div className="answers">
          {question.answers.map((answer, index) => (
            <div
              key={index}
              className={`answer answer-${index + 1} ${
                question.correctAnswer === index ? "correct" : "in-correct"
              }`}
            >
              <div className="answer-label">{QUESTION_LABELS[index]}</div>
              <div className="answer-content">
                <Input
                  value={answer}
                  onChange={(e) =>
                    onChangeQuestion({
                      ...question,
                      answers: question.answers.map((a, i) =>
                        i === index ? e.target.value : a
                      ),
                    })
                  }
                />
              </div>
              <div className="correct-checkbox">
                Câu trả lời đúng:{" "}
                <Switch
                  checked={question.correctAnswer === index}
                  onChange={(value) =>
                    onChangeQuestion({
                      ...question,
                      correctAnswer: value ? index : null,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBody;
