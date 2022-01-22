import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col } from "antd";

import "../styles.scss";

// chưa trả lời
// đã trả lời - đợi kết quả
// đã trả lời - đã có kết quả

const Choices = ({ playerAnswer, question }) => (
  <div className="question-info">
    <h1 className="question">{question.q1}</h1>
    <Row gutter={16}>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(0)}>
          <div className="answer-index">1</div>
          <h2>{question.a1}</h2>
        </div>
      </Col>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(0)}>
          <div className="answer-index">2</div>
          <h2>{question.a2}</h2>
        </div>
      </Col>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(0)}>
          <div className="answer-index">3</div>
          <h2>{question.a3}</h2>
        </div>
      </Col>
      <Col span={6}>
        <div className="answer" onClick={() => playerAnswer(0)}>
          <div className="answer-index">4</div>
          <h2>{question.a4}</h2>
        </div>
      </Col>
    </Row>
  </div>
);

const PlayGame = ({ socket }) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerData, setPlayerData] = useState({});
  const [question, setQuestion] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.socketId) {
      socket.emit("player-join-game", { id: params.socketId });
    }

    socket.on("noGameFound", () => {
      console.log("noGameFound: ");
      navigate(`/play/enter-pin`);
    });

    socket.on("hostDisconnect", () => {
      console.log("hostDisconnect: ");
      navigate(`/play/enter-pin`);
    });

    socket.on("playerGameData", (res) => {
      console.log("on playerGameData: ", res);
    });

    socket.on("answerResult", (res) => {
      setIsCorrect(res);
    });

    socket.on("GameOverPlayer", (playerData) => {
      setGameOver(true);
      setPlayerData(playerData);
    });

    socket.on("GameOverPlayer", (playerData) => {
      setGameOver(true);
      setPlayerData(playerData);
    });

    socket.on("questionOver", () => {
      setShowResult(true);
    });

    socket.on("nextQuestionPlayer", () => {
      setAnswered(false);
      setIsCorrect(false);
      setShowResult(false);
    });

    // return () => socket.close();
    return () => {
      socket.emit("disconnect", socket.id);
    };
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
            <p>
              Điểm đạt được: {playerData.score / 100} /{" "}
              {playerData.questionLength}
            </p>
            <Link to="/play/enter-pin">Thoát</Link>
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
            <Choices playerAnswer={playerAnswer} question={question} />
          )}
          {!showResult && answered && <h1>Submited. Waiting for others!</h1>}
          {showResult && <h1>{isCorrect ? "correct" : "incorrect"}</h1>}
        </Col>
      </Row>
    </div>
  );
};

export default PlayGame;
