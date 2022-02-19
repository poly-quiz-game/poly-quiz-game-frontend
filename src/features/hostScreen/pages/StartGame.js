import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Row, Col, Switch, Button, Image } from "antd";

import MainLayout from "layouts/main.layout";

import { fetchQuiz, selectQuiz, selectLoading } from "../quizSlice";

import "../styles.scss";

const defaultConfig = {
  randomQuestion: true,
  randomAnswer: false,
  displayQuestionOnPlayerDevice: false,
  autoPlay: false,
};

const StartGame = ({ socket }) => {
  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quiz = useSelector(selectQuiz);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuiz(params.id));

    socket.on("showGamePin", ({ pin }) => {
      navigate(`/host/lobby/${pin}`);
    });
  }, [dispatch, params]);

  const startGame = () => {
    socket.emit("host-join", { id: quiz._id });
  };

  return (
    <div className="start-quiz__screen">
      <Row>
        <Col span={12} offset={6}>
          {loading ? (
            <Skeleton />
          ) : (
            <div>
              <div className="quiz-info">
                <img
                  
                  src="/img/logo.png"
                />
                <h1>{quiz.name}</h1>
                <div className="box-start">
                  <div className="icon-game">
                  <img
                  src="/img/icon.png"
                />
                  </div>
                  <div className="question-number">
                    {(quiz.questions || []).length} câu hỏi
                  </div>
                  <Button
                    size="large"
                    style={{  backgroundColor: "#399D29",border: "none",color:"#fff",fontSize: "20px",paddingTop:"0",marginTop: "30px"}}
                    className="create-room"
                    onClick={startGame}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </div>
              {/* <div className="room-settings">
                  <div className="setting-option">
                    <h3>Hiển thị câu hỏi, câu trả lời trên máy người chơi</h3>
                    <Switch
                      checked={defaultConfig.displayQuestionOnPlayerDevice}
                      defaultChecked={
                        defaultConfig.displayQuestionOnPlayerDevice
                      }
                    />
                  </div>
                  <div className="setting-option">
                    <h3>Xáo trộn câu hỏi</h3>
                    <Switch
                      checked={defaultConfig.randomQuestion}
                      defaultChecked={defaultConfig.randomQuestion}
                    />
                  </div>
                  <div className="setting-option">
                    <h3>Xáo trộn các câu trả lời</h3>
                    <Switch
                      checked={defaultConfig.randomAnswer}
                      defaultChecked={defaultConfig.randomAnswer}
                    />
                  </div>
                </div>
                <div className="room-settings">
                  <div className="setting-option">
                    <h3>Tự động chuyển câu hỏi</h3>
                    <Switch
                      checked={defaultConfig.autoPlay}
                      defaultChecked={defaultConfig.autoPlay}
                    />
                  </div>
                </div> */}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default StartGame;
