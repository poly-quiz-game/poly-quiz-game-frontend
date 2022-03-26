import React from "react";
import _ from "lodash";
import { Button, Popover } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { questionTypeLabels, questionTypes } from "../../../../consts";

const AnswersPreview = ({
  question,
  i,
  isActive,
  setActiveQuestion,
  error,
  addQuestion,
  deleteQuestion,
  correctAnswer,
}) => {
  return (
    <Draggable draggableId={i.toString()} key={i} index={i}>
      {(provided) => (
        <div
          className={`question-preview-item ${isActive ? "active" : ""}`}
          onClick={() => setActiveQuestion(i)}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="question-index" {...provided.dragHandleProps}>
            <h3>
              {i + 1}. {questionTypeLabels[question?.type?.name]}
            </h3>
            {!_.isEmpty(error) && (
              <div className="question-error-sticky">
                <Popover
                  content={
                    <div className="question-error-list">
                      {Object.keys(error).map((key) => (
                        <div
                          className="question-error"
                          key={`error-item-${key}`}
                        >
                          <ExclamationCircleOutlined /> {error[key]}
                        </div>
                      ))}
                    </div>
                  }
                >
                  <ExclamationCircleOutlined />
                </Popover>
              </div>
            )}
          </div>

          <div className="question-preview-content">
            <div className="btns">
              <div
                className="action-button duplicate-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addQuestion(question);
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3334 4.25008C11.3334 3.49863 11.0349 2.77797 10.5036 2.24661C9.9722 1.71526 9.25153 1.41675 8.50008 1.41675H4.25008C3.49863 1.41675 2.77797 1.71526 2.24661 2.24661C1.71526 2.77797 1.41675 3.49863 1.41675 4.25008V8.50008C1.41675 9.25153 1.71526 9.9722 2.24661 10.5036C2.77797 11.0349 3.49863 11.3334 4.25008 11.3334H5.66675V12.7501C5.66675 13.5015 5.96526 14.2222 6.49661 14.7536C7.02797 15.2849 7.74863 15.5834 8.50008 15.5834H12.7501C13.5015 15.5834 14.2222 15.2849 14.7536 14.7536C15.2849 14.2222 15.5834 13.5015 15.5834 12.7501V8.50008C15.5834 7.74863 15.2849 7.02797 14.7536 6.49661C14.2222 5.96526 13.5015 5.66675 12.7501 5.66675H11.3334V4.25008ZM9.91675 5.66675H8.50008C7.74863 5.66675 7.02797 5.96526 6.49661 6.49661C5.96526 7.02797 5.66675 7.74863 5.66675 8.50008V9.91675H4.25008C3.87436 9.91675 3.51402 9.76749 3.24835 9.50182C2.98267 9.23614 2.83341 8.87581 2.83341 8.50008V4.25008C2.83341 3.87436 2.98267 3.51402 3.24835 3.24835C3.51402 2.98267 3.87436 2.83341 4.25008 2.83341H8.50008C8.87581 2.83341 9.23614 2.98267 9.50182 3.24835C9.76749 3.51402 9.91675 3.87436 9.91675 4.25008V5.66675ZM12.7501 7.08342C13.1258 7.08342 13.4861 7.23267 13.7518 7.49835C14.0175 7.76402 14.1667 8.12436 14.1667 8.50008V12.7501C14.1667 13.1258 14.0175 13.4861 13.7518 13.7518C13.4861 14.0175 13.1258 14.1667 12.7501 14.1667H8.50008C8.12436 14.1667 7.76402 14.0175 7.49835 13.7518C7.23267 13.4861 7.08342 13.1258 7.08342 12.7501V8.50008C7.08342 8.12436 7.23267 7.76402 7.49835 7.49835C7.76402 7.23267 8.12436 7.08342 8.50008 7.08342H12.7501Z"
                    fill="#454545"
                  />
                </svg>
              </div>
              <div
                className="action-button delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteQuestion(i);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75 1.16675H5.25C4.60658 1.16675 4.08333 1.69 4.08333 2.33341V3.50008H1.75V4.66675H2.91667V11.6667C2.91667 12.3102 3.43992 12.8334 4.08333 12.8334H9.91667C10.5601 12.8334 11.0833 12.3102 11.0833 11.6667V4.66675H12.25V3.50008H9.91667V2.33341C9.91667 1.69 9.39342 1.16675 8.75 1.16675ZM5.25 2.33341H8.75V3.50008H5.25V2.33341ZM9.91667 11.6667H4.08333V4.66675H9.91667V11.6667Z"
                    fill="#454545"
                  />
                </svg>
              </div>
            </div>
            <div className="question-preview-body">
              <div className="question-title">
                {question.question || "Câu hỏi"}
              </div>
              <div className="question-image-content">
                <div className="question-time">{question.timeLimit / 1000}</div>
                <div className="question-preview-image-container">
                  <div className="question-preview-image">
                    <div className="image">
                      <img src={question.image} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="question-answers">
                {question.answers.map((answer, i) => (
                  <div
                    key={i}
                    className={`${
                      correctAnswer.includes(i.toString())
                        ? "correct-answer"
                        : ""
                    } ${
                      question.answers.length === 1 ? "w-100" : ""
                    } question-answer`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const ListQuestions = ({
  questions,
  addQuestion,
  deleteQuestion,
  activeQuestion,
  errors,
  setActiveQuestion,
  setQuestions,
}) => {
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (!destination || destination.index === source.index) {
      return;
    }
    const newQuestions = Array.from(questions);
    const [removed] = newQuestions.splice(source.index, 1);
    newQuestions.splice(destination.index, 0, removed);
    setActiveQuestion(destination.index);
    setQuestions(newQuestions);
  };

  return (
    <div className="left-sidebar">
      <div className="list-questions">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {questions.map((question, i) => {
                  let correctAnswer = question.correctAnswer
                    .split("|")
                    .filter((a) => a);
                  const isActive = activeQuestion === i;
                  const error = errors[i];
                  let answers = [...question.answers];
                  if (question?.type?.name === questionTypes.TRUE_FALSE_ANSWER) {
                    answers = answers.slice(0, 2);
                  }
                  if (question?.type?.name === questionTypes.TYPE_ANSWER) {
                    answers = answers.slice(0, 1);
                    correctAnswer = [];
                  }
                  return (
                    <AnswersPreview
                      question={{ ...question, answers }}
                      i={i}
                      key={i}
                      isActive={isActive}
                      setActiveQuestion={setActiveQuestion}
                      error={error}
                      addQuestion={addQuestion}
                      deleteQuestion={deleteQuestion}
                      correctAnswer={correctAnswer}
                    />
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="add-question-button">
        <Button onClick={() => addQuestion()}>Thêm câu hỏi</Button>
      </div>
    </div>
  );
};

export default ListQuestions;
