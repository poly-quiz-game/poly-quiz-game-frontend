import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Button } from "antd";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";

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

    socket.on("lobby-info", ({ hostSocketId }) => {
      navigate(`/host/lobby/${hostSocketId}`);
    });

    socket.on("no-quiz-found", () => {
      alert("no-quiz-found");
    });
  }, [dispatch, params]);

  const startGame = () => {
    socket.emit("host-create-lobby", { id: quiz.id });
  };

  return (
    <div className="start-quiz__screen">
      {loading ? (
        <Skeleton />
      ) : (
        <div className="start-quiz">
          <img src="/img/logo.png" />
          <div className="quiz-info">
            <h1>{quiz.name}</h1>
            <h3>
              <QuestionCircleOutlined /> {(quiz.questions || []).length} câu hỏi
            </h3>
            <h3>
              <UserOutlined /> Cho phép {quiz.numberOfPlayer} người tham gia
            </h3>
          </div>
          <Button
            size="large"
            className="create-room"
            type="primary"
            onClick={startGame}
          >
            Tiếp tục
          </Button>
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
    </div>
  );
};

export default StartGame;
