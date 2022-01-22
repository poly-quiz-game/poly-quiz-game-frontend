import React, { useState } from "react";
import { Card } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";
import { Row, Col } from "antd";
import "./styles.scss";

const quizzes = [
  {
    name: "cau hoi 1",
    answer: ["chon 1", "chon 2", "chon 3", "chon 4"],
    time: 200,
    correct: 1,
  },
  {
    name: "cau hoi 2",
    answer: ["chon 1", "chon 2", "chon 3", "chon 4"],
    time: 200,
    correct: 2,
  },
  {
    name: "cau hoi 3",
    answer: ["chon 1", "chon 2", "chon 3", "chon 4"],
    time: 200,
    correct: 1,
  },
  {
    name: "cau hoi 4",
    answer: ["chon 1", "chon 2", "chon 3", "chon 4"],
    time: 200,
    correct: 1,
  },
];
const EditQuiz = () => {
  const [state, setState] = useState(quizzes);
  const deleteQuiz = (abc) => {
    const newQuiz = state.filter((quiz, i) => abc !== i);
    setState(newQuiz);
  };

  const double = (abc) => {
    const newQuiz = state.find((item, index) => index === abc);

    const newState = [...state];
    newState.splice(abc, 0, newQuiz);
    setState(newState);
  };

  console.log(state[0].correct);
  const checkSuccess = (a) => {
    console.log(a);
    state[0].correct;
    setState(state)
  };

  return (
    <div className="sample bg-gray-edit">
      <h3>Poly quiz! for formative assessment</h3>
      {state
        ? state.map((question, index) => {
            return (
              <div className="bg-white-form " key={index}>
                <form className="form-edit">
                  <label>{question.name}</label>
                  <div className="form-padding">
                    {question.answer.map((as, index) => {
                      return (
                        <div className="answer">
                          {question.correct == index ? (
                            <div className="answer__box-success" onClick={()=>checkSuccess(index)} />
                          ) : (
                            <div className="answer__box-wrong" onClick={()=>checkSuccess(index)}/>
                          )}
                          <div className="answer-px">{as}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="btn">
                    <button>
                      <i class="far fa-clock"></i> {question.time} giây
                    </button>
                    <button
                      type="buttom"
                      className="btn-mx"
                      onClick={() => double(index)}
                    >
                      <i class="far fa-copy"></i> Nhân bản
                    </button>
                    <button onClick={() => deleteQuiz(index)}>
                      <i class="far fa-trash-alt"></i> Xóa
                    </button>
                  </div>
                </form>
              </div>
            );
          })
        : null}
      <div className="add-answer">
        <button>
          <i class="fas fa-plus"></i>Thêm câu hỏi
        </button>
      </div>
    </div>
  );
};

export default EditQuiz;
