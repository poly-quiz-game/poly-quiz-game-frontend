import React from "react";
import { questionTypes } from "consts";

const QUESTION_LABELS = ["A", "B", "C", "D"];

const CheckIcon = () => (
  <svg
    width="47"
    height="38"
    viewBox="0 0 47 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39.7062 1.95624C40.4986 1.20186 41.553 0.784812 42.6471 0.79309C43.7411 0.801368 44.7891 1.23433 45.57 2.0006C46.3508 2.76688 46.8035 3.80655 46.8324 4.90021C46.8613 5.99388 46.4643 7.05601 45.725 7.86249L23.2812 35.9312C22.8953 36.3469 22.4295 36.6805 21.9117 36.912C21.3939 37.1436 20.8347 37.2684 20.2676 37.2789C19.7005 37.2894 19.1371 37.1854 18.6111 36.9732C18.0851 36.7609 17.6073 36.4448 17.2062 36.0437L2.32247 21.16C1.90798 20.7738 1.57553 20.308 1.34495 19.7905C1.11437 19.273 0.990387 18.7144 0.980393 18.1479C0.970398 17.5815 1.0746 17.0188 1.28678 16.4935C1.49896 15.9682 1.81478 15.491 2.21538 15.0904C2.61599 14.6898 3.09318 14.374 3.61848 14.1618C4.14379 13.9496 4.70646 13.8454 5.27291 13.8554C5.83936 13.8654 6.398 13.9894 6.9155 14.22C7.43299 14.4505 7.89875 14.783 8.28497 15.1975L20.0637 26.9706L39.5993 2.07999C39.6345 2.03668 39.6721 1.99536 39.7118 1.95624H39.7062Z"
      fill="#1368CE"
    />
  </svg>
);
const sumAnswers = (arr) => {
  const obj = [0, 0, 0, 0];
  arr.forEach((item) => {
    const answers = item.answers[item.answers.length - 1].split("|");
    answers.forEach((answer) => {
      obj[answer] += 1;
    });
  });
  return obj;
};

const TotalAnswerResult = ({ questionResult, questionIndex, question }) => {
  const correctAnswers = question.correctAnswer.split("|").filter((a) => a);

  const calculateAnsersNumber = (index) => {
    return sumAnswers(questionResult)[index];
  };

  const calculateHeight = (index) => {
    return (calculateAnsersNumber(index) / questionResult.length) * 150;
  };

  return (
    <div className="total-answer-result">
      {(question.type === questionTypes.TRUE_FALSE_ANSWER
        ? [...question.answers].slice(0, 2)
        : question.answers
      ).map((answer, index) => (
        <div className={`total-answer total-answer-${index + 1}`} key={index}>
          <div
            className="answer-tree"
            style={{
              height: `${calculateHeight(index)}px`,
            }}
          />
          <div
            className="answer-tree"
            style={{
              height: "30px",
            }}
          >
            {QUESTION_LABELS[index]}{" "}
            {correctAnswers.includes(answer.index.toString()) && <CheckIcon />}
          </div>
          <div className="total-number">{calculateAnsersNumber(index)}</div>
        </div>
      ))}
    </div>
  );
};

export default TotalAnswerResult;
