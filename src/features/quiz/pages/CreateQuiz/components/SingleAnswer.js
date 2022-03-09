import React from "react";
import { Input } from "antd";

const QUESTION_LABELS = ["A", "B", "C", "D"];

const SingleAnswer = ({ question, onChangeQuestion }) => {
  const onSelectCorrectAnswer = (index) =>
    onChangeQuestion({
      ...question,
      correctAnswer: index.toString(),
    });

  const onChangeAnswer = (index, value) =>
    onChangeQuestion({
      ...question,
      answers: question.answers.map((a, i) => (i === index ? value : a)),
    });

  return (
    <div className="answers">
      {question.answers.map((answer, index) => {
        const isCorrect = question.correctAnswer === index.toString();
        return (
          <div
            key={index}
            className={`answer answer-${index + 1} ${
              isCorrect ? "correct" : "in-correct"
            }`}
          >
            <div className="answer-label">{QUESTION_LABELS[index]}</div>
            <div className="answer-content">
              <Input
                value={answer}
                onChange={(e) => onChangeAnswer(index, e.target.value)}
              />
            </div>
            <div className="correct-checkbox">
              <button
                data-functional-selector="question-answer__toggle-button"
                className={`correct-answer-check-button ${
                  isCorrect ? "checked" : ""
                }`}
                onClick={() => onSelectCorrectAnswer(index)}
              >
                {isCorrect && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="#fff"
                      d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleAnswer;
