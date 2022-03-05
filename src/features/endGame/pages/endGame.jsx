import React from "react";
import { Link } from "react-router-dom";
import "./indexEndGame.css";
import { Tooltip, Progress } from "antd";
const productQuiz = [
  {
    id: "1",
    name: "duc man",
    points:"1000",
    image:""
  },
  {
    id: "2",
    name: "khieem man lol",
    points:"120"
  },
  {
    id: "3",
    name: "huy man",
  },
  {
    id: "4",
    name: "duc man",
  },
  {
    id: "5",
    name: "duc man",
  },
];
const Endgame = () => {
  const [state, setState] = React.useState(productQuiz);
  return (
    <div className="main">
      <div className="mains">
        <Link to="/quiz">
          <div className="row nav-header-top">
            <i
              className="fas fa-times-circle"
              style={{ marginBottom: "15px" }}
            ></i>
          </div>
        </Link>
      </div>
      <div className="container " style={{ marginTop: "20px" }}>
        <div>
          <div className="table">
            <div className="row nav-header-top">
              <h5>INDEX</h5>
              <h5>NAME</h5>
              <h5 className="name-poins">POINS</h5>
            </div>
            <div className="list-quiz-game">
              <ul>
                {state.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="row list-quiz">
                        <span className="index-list">{v.id}</span>{" "}
                        <div className="nav-image-top row">
                          <img src="./icon1.png" alt="" />
                          <h4 className="name-list">{v.name}</h4>
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
                        <div className="poins">{v.points}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Endgame;
