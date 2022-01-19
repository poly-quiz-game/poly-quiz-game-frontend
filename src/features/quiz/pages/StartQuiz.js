import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import { Skeleton, Row, Col, Switch, Button } from "antd";

import MainLayout from "layouts/main.layout";

import { fetchQuiz, selectQuiz, selectLoading } from "../quizSlice";

import "./styles.scss";

const defaultConfig = {
  randomQuestion: true,
  randomAnswer: false,
  displayQuestionOnPlayerDevice: false,
  autoPlay: false,
};

const StartQuiz = ({ socket }) => {
  let params = useParams();
  const dispatch = useDispatch();

  const [roomConfig, setRoomConfig] = useState(defaultConfig);
  const [roomPin, setRoomPin] = useState(null);

  const quiz = useSelector(selectQuiz);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuiz(params.id));

    const roomPinListener = (room) => {
      console.log("roomPinListener: ", room);
      setRoomPin(room.pin);
    };

    socket.on("showRoomPin", roomPinListener);
  }, [dispatch, params]);

  const startRoom = () => {
    socket.emit("host-join", { id: quiz._id });
  };

  if (roomPin) {
    return <Navigate to={`/host/lobby?roomPin=${roomPin}`} />;
  }

  return (
    <MainLayout>
      <Row>
        <Col span={12} offset={6}>
          <div className="start-quiz__screen">
            {loading ? (
              <Skeleton />
            ) : (
              <div>
                <div className="quiz-info">
                  <h1>{quiz.name}</h1>
                  <div className="question-number">
                    {(quiz.questions || []).length} câu hỏi
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    className="create-room"
                    onClick={startRoom}
                  >
                    Tạo phòng
                  </Button>
                </div>
                <div className="room-settings">
                  <div className="setting-option">
                    <h3>Hiển thị câu hỏi, câu trả lời trên máy người chơi</h3>
                    <Switch
                      checked={roomConfig.displayQuestionOnPlayerDevice}
                      defaultChecked={roomConfig.displayQuestionOnPlayerDevice}
                    />
                  </div>
                  <div className="setting-option">
                    <h3>Xáo trộn câu hỏi</h3>
                    <Switch
                      checked={roomConfig.randomQuestion}
                      defaultChecked={roomConfig.randomQuestion}
                    />
                  </div>
                  <div className="setting-option">
                    <h3>Xáo trộn các câu trả lời</h3>
                    <Switch
                      checked={roomConfig.randomAnswer}
                      defaultChecked={roomConfig.randomAnswer}
                    />
                  </div>
                </div>
                <div className="room-settings">
                  <div className="setting-option">
                    <h3>Tự động chuyển câu hỏi</h3>
                    <Switch
                      checked={roomConfig.autoPlay}
                      defaultChecked={roomConfig.autoPlay}
                    />
                  </div>
                </div>
              </div>
            )}
            <br />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default StartQuiz;
