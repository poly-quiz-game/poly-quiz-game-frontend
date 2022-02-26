import React from "react";
import "./indexEndGame.css";
import { Tooltip, Progress } from "antd";
const Endgame = () => {
  return (
    <div className="main">
      <div className="container ">
        <div>
          <div className="table">
            <div className="row nav-header-top">
              <h5>INDEX</h5>
              <h5>NAME</h5>
              <h5 className="name-poins">POINS</h5>
            </div>
            <div className="list-quiz-game">
              <ul>
                <li>
                  <div className="row list-quiz">
                    <span className="index-list">1</span>{" "}
                    <div className="nav-image-top row">
                      <img src="./icon1.png" alt="" />
                      <h4 className="name-list">duc man</h4>
                    </div>
                    <Tooltip
                      className="input-poins"
                      title="3 done / 3 in progress / 4 to do"
                      style={{ height: "100px" }}
                    >
                      <Progress
                        percent={100}
                        success={{ percent: 50 }}
                        className="nav-header"
                      />
                    </Tooltip>
                    <div className="poins">10000</div>
                  </div>
                </li>
                <li>
                  <div className="row list-quiz">
                    <span className="index-list">1</span>{" "}
                    <div className="nav-image-top row">
                      <img src="./icon1.png" alt="" />
                      <h4 className="name-list">duc man</h4>
                    </div>
                    <Tooltip
                      className="input-poins"
                      title="3 done / 3 in progress / 4 to do"
                      style={{ height: "100px" }}
                    >
                      <Progress
                        percent={100}
                        success={{ percent: 90 }}
                        className="nav-header"
                      />
                    </Tooltip>
                    <div className="poins">10000</div>
                  </div>
                </li>
                <li>
                  <div className="row list-quiz">
                    <span className="index-list">1</span>{" "}
                    <div className="nav-image-top row">
                      <img src="./icon1.png" alt="" />
                      <h4 className="name-list">duc man</h4>
                    </div>
                    <Tooltip
                      className="input-poins"
                      title="3 done / 3 in progress / 4 to do"
                      style={{ height: "100px" }}
                    >
                      <Progress
                        percent={100}
                        success={{ percent: 90 }}
                        className="nav-header"
                      />
                    </Tooltip>
                    <div className="poins">10000</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endgame;
