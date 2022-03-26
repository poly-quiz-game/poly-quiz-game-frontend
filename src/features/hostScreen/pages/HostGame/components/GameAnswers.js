import React from "react";
import { questionTypes } from "consts";
import { gameStateTypes } from "../index";

const GameAnswers = ({ question, gameState }) => {
  const { type } = question;
  console.log(111, question);
  if (type.name === questionTypes.TYPE_ANSWER) {
    if (gameState === gameStateTypes.QUESTION_RESULT) {
      return null;
    }
    return (
      <div className="answers">
        <div className="answer-0">
          <div className="answer-content">Hãy nhập câu trả lời</div>
        </div>
      </div>
    );
  }

  let answers = question.answers;
  if (type === questionTypes.TRUE_FALSE_ANSWER) {
    answers = question.answers.slice(0, 2);
  }

  const correctAnswers = question.correctAnswer.split("|").filter((a) => a);

  return (
    <div className="answers">
      {(answers || []).map((answer, i) => {
        const isCorrect = correctAnswers.includes(answer.index.toString());

        return (
          <div
            key={answer.index}
            className={`answer answer-${i + 1} ${
              gameState === gameStateTypes.QUESTION_RESULT &&
              (isCorrect ? "correct" : "in-correct")
            }`}
          >
            <div className="answer-label">A</div>
            <div className="answer-content">{answer.answer}</div>
            {gameState === gameStateTypes.QUESTION_RESULT && isCorrect && (
              <div className="correct-checkbox">
                <button
                  data-functional-selector="question-answer__toggle-button"
                  className={`correct-answer-check-button ${
                    isCorrect ? "checked" : ""
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="#fff"
                      d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameAnswers;
