import React from "react";
import { Card } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";
import { Row, Col } from "antd";
import "./styles.scss";

const quizzes = [{ _id: 123 }];

const EditQuiz = () => {
  return (
    <div className="sample bg-gray-edit">
      <h3>Poly quiz! for formative assessment</h3>
      <div className="bg-white-form ">
        <form className="form-edit">
          <label>
            Replace this with a simple question. Use the language and vocabulary
            that you know will be used in the unit test ?
          </label>
          <div className="form-padding">
            <div className="answer">
              <div className="answer__box-wrong" />
              <div className="answer-px">Wrong Answer</div>
            </div>
            <div className="answer">
              <div className="answer__box-success" />
              <div className="answer-px">Correct Answer</div>
            </div>
            <div className="answer">
              <div className="answer__box-wrong" />
              <div className="answer-px">Wrong Answer</div>
            </div>
            <div className="answer">
              <div className="answer__box-wrong" />
              <div className="answer-px">Wrong Answer</div>
            </div>
          </div>
          <div className="btn">
            <button>
              <i class="far fa-clock"></i> 30 giây
            </button>
            <button className="btn-mx">
              <i class="far fa-copy"></i> Nhân bản
            </button>
            <button>
              <i class="far fa-trash-alt"></i> Xóa
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white-form ">
        <form className="form-edit">
          <label>
            Replace this with a simple question. Use the language and vocabulary
            that you know will be used in the unit test ?
          </label>
          <div className="form-padding">
            <div className="answer">
              <div className="answer__box-wrong" />
              <div className="answer-px">Wrong Answer</div>
            </div>
            <div className="answer">
              <div className="answer__box-success" />
              <div className="answer-px">Correct Answer</div>
            </div>
            <div className="answer">
              <div className="answer__box-wrong" />
              <div className="answer-px">Wrong Answer</div>
            </div>
            <div className="answer">
              <div className="answer__box-wrong" />
              <div className="answer-px">Wrong Answer</div>
            </div>
          </div>
          <div className="btn">
            <button>
              <i class="far fa-clock"></i> 30 giây
            </button>
            <button className="btn-mx">
              <i class="far fa-copy"></i> Nhân bản
            </button>
            <button>
              <i class="far fa-trash-alt"></i> Xóa
            </button>
          </div>
        </form>
      </div>
      <div className="add-answer">
        <button>
          <i class="fas fa-plus"></i>Thêm câu hỏi
        </button>
      </div>
    </div>
  );
};

export default EditQuiz;
