import React, { useState } from "react";
import { Button, Input } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { questionTypes } from "consts";
import { handleUploadImage } from "../../../../utils";
import QuestionOption from "./QuestionOption";
import {
  MultipleAnswer,
  SingleAnswer,
  TrueFalseAnswer,
  TypeAnswer,
} from "./components";

const QuestionAnswers = ({ question, onChangeQuestion }) => {
  switch (question.type) {
    case questionTypes.SINGLE_CORRECT_ANSWER:
      return (
        <SingleAnswer onChangeQuestion={onChangeQuestion} question={question} />
      );
    case questionTypes.MULTIPLE_CORRECT_ANSWER:
      return (
        <MultipleAnswer
          onChangeQuestion={onChangeQuestion}
          question={question}
        />
      );
    case questionTypes.TRUE_FALSE_ANSWER:
      return (
        <TrueFalseAnswer
          onChangeQuestion={onChangeQuestion}
          question={question}
        />
      );
    case questionTypes.TYPE_ANSWER:
      return (
        <TypeAnswer onChangeQuestion={onChangeQuestion} question={question} />
      );
  }
};

const QuestionBody = ({ question, onChangeQuestion, deleteQuestion }) => {
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

  const onChangeQuestionType = (type) => {
    const newQuestion = { ...question };
    if (type === questionTypes.TYPE_ANSWER) {
      newQuestion.correctAnswer = "0";
    } else {
      newQuestion.correctAnswer = "";
    }
    onChangeQuestion({ ...newQuestion, type });
  };

  const onChangeQuestionTime = (timeLimit) => {
    onChangeQuestion({ ...question, timeLimit });
  };

  return (
    <>
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
                {question.image && !loading ? (
                  <>
                    <img src={question.image} />
                    <div className="image-actions">
                      <Button>
                        <label htmlFor="upload-image">Thay ảnh</label>
                      </Button>
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
          <QuestionAnswers
            onChangeQuestion={onChangeQuestion}
            question={question}
          />
        </div>
      </div>
      <QuestionOption
        onChangeQuestionType={onChangeQuestionType}
        onChangeQuestionTime={onChangeQuestionTime}
        question={question}
        deleteQuestion={deleteQuestion}
      />
    </>
  );
};

export default QuestionBody;
