import React, { useState } from "react";
import { Button, Input } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { handleUploadImage } from "../../../../utils";

const QUESTION_LABELS = ["A", "B", "C", "D"];

const QuestionBody = ({ question, onChangeQuestion }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      setLoading(true);
      const imageUrl = await handleUploadImage(file);
      setQuestionImage(imageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setQuestionImage = (imageUrl) => {
    onChangeQuestion({
      ...question,
      image: imageUrl,
    });
  };

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
          <div className="image-container">
            <div className="image">
              {question.image ? (
                <>
                  <img src={question.image} />
                  <div className="image-actions">
                    <label htmlFor="upload-image">
                      <Button>Thay ảnh</Button>
                    </label>
                    <Button onClick={() => setQuestionImage("")}>Xoá</Button>
                  </div>
                </>
              ) : (
                <label htmlFor="upload-image">
                  <div className="image-upload-button">
                    <FileImageOutlined />
                    <p>{!loading ? "Thêm ảnh" : "Đang tải ảnh lên..."}</p>
                  </div>
                </label>
              )}
              <input
                id="upload-image"
                type="file"
                name="image"
                onChange={handleSubmitFile}
                className="form-input"
              />
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
                <button
                  data-functional-selector="question-answer__toggle-button"
                  className={`correct-answer-check-button ${
                    question.correctAnswer === index ? "checked" : ""
                  }`}
                  onClick={() =>
                    onChangeQuestion({
                      ...question,
                      correctAnswer:
                        question.correctAnswer !== index ? index : null,
                    })
                  }
                >
                  {question.correctAnswer === index && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#fff"
                        d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBody;
