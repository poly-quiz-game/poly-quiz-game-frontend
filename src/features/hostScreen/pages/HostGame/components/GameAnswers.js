import React from "react";
import { questionTypes } from "consts";

const GameAnswers = ({ question, gameStateTypes, gameState }) => {
  const { type } = question;

  if (type === questionTypes.TYPE_ANSWER) {
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
          </div>
        );
      })}
    </div>
  );
};

export default GameAnswers;
