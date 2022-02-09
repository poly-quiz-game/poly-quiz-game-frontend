import React from "react";

const ListQuestions = () => {
  return (
    <div className="left-sidebar">
      <div className="list-questions">
        <div className="question-preview">
          <div className="btns">
            <div className="action-button">dup</div>
            <div className="action-button">del</div>
          </div>
          <div className="question-preview-body">
            <div className="question-title">
              Replace this with a simple question. Use the <b>language</b> and{" "}
              <b>vocabulary</b> that you know will be used in the unit test.
            </div>
            <div className="question-body">
              <div className="question-time">20</div>
              <div className="question-image">
                <div className="image"></div>
              </div>
            </div>
            <div className="question-answers">
              <div className="question-answer"></div>
              <div className="question-answer"></div>
              <div className="question-answer"></div>
              <div className="question-answer correct-answer"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-question-button">
        <button>Thêm câu hỏi</button>
      </div>
    </div>
  );
};

const QuestionBody = () => {
  return <div className="question-body">question-body</div>;
};

const QuestionOption = () => {
  return <div className="question-options">question-options</div>;
};

const CreateQuiz = () => {
  return (
    <div className="create-quiz">
      <div className="header">
        <div className="header-content">
          <div className="left">
            <div className="logo">LOGO</div>
            <div className="quiz-settings">
              <div className="quiz-name">Quiz game là gì?</div>
              <button className="setting-button">Cài đặt</button>
            </div>
          </div>
          <div className="right-buttons">
            <button>Thoát</button>
            <button>Lưu</button>
          </div>
        </div>
      </div>
      <div className="body">
        <ListQuestions />
        <QuestionBody />
        <QuestionOption />
      </div>
    </div>
  );
};

export default CreateQuiz;
