import React from "react";
import { Link } from "react-router-dom";
import "./indexListQuiz.css";
const Listquiz = () => {
  return (
    <div>
     <Link to="/quiz">
     <div className="mains">
        <div className="row nav-header-top">
          <i className="fas fa-times-circle"></i>
        </div>
      </div>
     </Link>
      <div className="content-main">
        <div className="container">
          <div className="table-content">
            <h4 className="content-top">Summary</h4>
            <div className="content-list-user row">
              <img src="icon1.png" alt="" />
              <div className="content-user-right">
                <h5>duc man</h5>
                <div className="buttons">
                  <i className="fas fa-user"></i>
                  <span>view</span>
                </div>
              </div>
            </div>
            <div className="content-row row">
              <div className="content-list-users row ">
                <div>
                  <span>rank</span>
                  <h5 style={{ color: "white", fontSize: "15px" }}>16/17</h5>
                </div>
                <i className="fab fa-hackerrank"></i>
              </div>
              <div className="content-list-userss row ">
                <div>
                  <span>Score</span>
                  <h5 style={{ color: "white", fontSize: "15px" }}>1000</h5>
                </div>
                <i className="fab fa-hackerrank"></i>
              </div>
            </div>
            <button style={{ background: "rgb(71, 12, 99)", color: "white" }}>
              End game
            </button>
            <h4 className="title-content-quiz ">Performance Stats</h4>
            <div className="box-content row">
              <div className="quizz-true-list row">
                <i className="fas fa-times"></i>
                <div className="quiz-false-left">
                  <h3>1</h3>
                  <h4>corren</h4>
                </div>
              </div>
              <div className="quizz-true-lists row">
                <i className="fas fa-check-double"></i>
                <div className="quiz-true-rigth">
                  <h3>1</h3>
                  <h4>Incorrect</h4>
                </div>
              </div>
            </div>
            <div className="table-list-quiz">
              <div className="table-top-list-name">
                <h3>Review Questions</h3>
                <h5>Click on the questions to see answers</h5>
              </div>
              <div className="tables">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listquiz;
