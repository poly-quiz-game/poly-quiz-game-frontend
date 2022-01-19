import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

import "../styles.scss";

// chưa trả lời
// đã trả lời - đợi kết quả
// đã trả lời - đã có kết quả

const Choices = ({ question, time, playerAnswer }) => (
  <div className="question-info">
    <br />
    <br />
    <br />
    <Row gutter={16}>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(0)}>
          <div className="answer-index">1</div>
          <h2>{question.a1}</h2>
        </div>
      </Col>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(1)}>
          <div className="answer-index">2</div>
          <h2>{question.a2}</h2>
        </div>
      </Col>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(2)}>
          <div className="answer-index">3</div>
          <h2>{question.a3}</h2>
        </div>
      </Col>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(3)}>
          <div className="answer-index">4</div>
          <h2>{question.a4}</h2>
        </div>
      </Col>
    </Row>
  </div>
);

const PlayGame = ({ socket }) => {
  const [time, setTime] = useState(30);
  const [question, setQuestion] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const interval = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.socketId) {
      socket.emit("player-join-room", { id: params.socketId });
    }

    socket.on("noRoomFound", () => {
      console.log("noRoomFound: ");
      navigate(`/play/enter-pin`);
    });
    socket.on("hostDisconnect", () => {
      console.log("hostDisconnect: ");
      navigate(`/play/enter-pin`);
    });

    socket.on("playerRoomData", (res) => {
      console.log("on playerRoomData: ", res);
    });

    socket.on("answerResult", (res) => {
      setIsCorrect(res);
    });

    socket.on("RoomOver", () => {
      setGameOver(true);
    });

    socket.on("questionOver", () => {
      setShowResult(true);
    });

    socket.on("nextQuestionPlayer", () => {
      setAnswered(false);
      setIsCorrect(false);
      setShowResult(false);
    });
  }, []);

  const playerAnswer = (num) => {
    setAnswered(true);
    socket.emit("playerAnswer", num);
  };

  if (gameOver) {
    return (
      <div className="game__screen">
        <Row>
          <Col span={20} offset={2}>
            <h1>Game over!</h1>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="game__screen">
      <Row>
        <Col span={20} offset={2}>
          {!answered && (
            <Choices
              question={question}
              time={time}
              playerAnswer={playerAnswer}
            />
          )}
          {!showResult && answered && <h1>Submited. Waiting for others!</h1>}
          {showResult && <h1>{isCorrect ? "correct" : "incorrect"}</h1>}
        </Col>
      </Row>
    </div>
  );
};

export default PlayGame;
