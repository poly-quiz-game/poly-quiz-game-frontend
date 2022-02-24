import React from "react";
import { Input } from "antd";

const TypeAnswer = ({ question, onChangeQuestion }) => {
  const onChangeCorrectAnswer = (value) =>
    onChangeQuestion({
      ...question,
      answers: question.answers.map((a, i) => (i === 0 ? value : a)),
    });

  return (
    <div className="answers">
      <div className="type-answer">
        <Input
          value={question.answers[0]}
          onChange={(e) => onChangeCorrectAnswer(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TypeAnswer;
