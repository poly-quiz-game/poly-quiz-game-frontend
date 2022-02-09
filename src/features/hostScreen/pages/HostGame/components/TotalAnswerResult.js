import React from "react";
import { groupBy } from "lodash";

const TotalAnswerResult = ({ questionResult, questionIndex }) => {
  return (
    <div className="total-answer-result">
      <div className="total-answer total-answer-1">
        <div
          className="answer-tree"
          style={{
            height: `${
              ((groupBy(questionResult, (p) => p.answers[questionIndex])[0]
                ?.length || 0) /
                questionResult.length) *
                150 +
              3
            }px`,
          }}
        ></div>
        <div className="total-number">
          {groupBy(questionResult, (p) => p.answers[questionIndex])[0]
            ?.length || 0}
        </div>
      </div>
      <div className="total-answer total-answer-2">
        <div
          className="answer-tree"
          style={{
            height: `${
              ((groupBy(questionResult, (p) => p.answers[questionIndex])[1]
                ?.length || 0) /
                questionResult.length) *
                150 +
              3
            }px`,
          }}
        ></div>
        <div className="total-number">
          {groupBy(questionResult, (p) => p.answers[questionIndex])[1]
            ?.length || 0}
        </div>
      </div>
      <div className="total-answer total-answer-3">
        <div
          className="answer-tree"
          style={{
            height: `${
              ((groupBy(questionResult, (p) => p.answers[questionIndex])[2]
                ?.length || 0) /
                questionResult.length) *
                150 +
              3
            }px`,
          }}
        ></div>
        <div className="total-number">
          {groupBy(questionResult, (p) => p.answers[questionIndex])[2]
            ?.length || 0}
        </div>
      </div>
      <div className="total-answer total-answer-4">
        <div
          className="answer-tree"
          style={{
            height: `${
              ((groupBy(questionResult, (p) => p.answers[questionIndex])[3]
                ?.length || 0) /
                questionResult.length) *
                150 +
              3
            }px`,
          }}
        ></div>
        <div className="total-number">
          {groupBy(questionResult, (p) => p.answers[questionIndex])[3]
            ?.length || 0}
        </div>
      </div>
    </div>
  );
};

export default TotalAnswerResult;
