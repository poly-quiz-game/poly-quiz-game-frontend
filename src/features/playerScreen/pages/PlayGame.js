import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col } from "antd";

import "../styles.scss";
// const CorrectIcon = (
//   <span style={{ color: "#52c41a" }}>
//     <CheckCircleFilled />
//   </span>
// );
// const IncorretIcocn = (
//   <span style={{ color: "#eb2f96" }}>
//     <CloseCircleFilled />
//   </span>
// );
// chưa trả lời
// đã trả lời - đợi kết quả
// đã trả lời - đã có kết quả

const PlayGame = ({ socket }) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerData, setPlayerData] = useState({});
  const [player, setPlayer] = useState({});
  const [game, setGame] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.socketId) {
      socket.emit("player-join-game", { id: params.socketId });
    }

    socket.on("noGameFound-player", () => {
      navigate(`/play/enter-pin`);
    });

    socket.on("hostDisconnect-player", () => {
      navigate(`/play/enter-pin`);
    });

    socket.on("answerResult-player", (result) => {
      setIsCorrect(result);
    });

    socket.on("playerInfo-player", (player) => {
      setPlayer(player);
    });

    socket.on("gameInfo-player", (game) => {
      setGame(game);
    });

    socket.on("GameOverPlayer", (playerData) => {
      setGameOver(true);
      setPlayerData(playerData);
    });

    socket.on("questionOver-all", (playersInGame, player) => {
      setShowResult(true);
      setPlayer(player);
    });

    socket.on("nextQuestionPlayer", () => {
      setAnswered(false);
      setIsCorrect(false);
      setShowResult(false);
    });

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
    <div className="player-game__screen">
      <div className="player-info">
        <img src="/img/logo.png" />
      </div>
      {!answered && (
        <div className="answers">
          <div className="answer answer-1" onClick={() => playerAnswer(0)}>
            <div className="answer-label">A</div>
          </div>
          <div className="answer answer-2" onClick={() => playerAnswer(1)}>
            <div className="answer-label">B</div>
          </div>
          <div className="answer answer-3" onClick={() => playerAnswer(2)}>
            <div className="answer-label">C</div>
          </div>
          <div className="answer answer-4" onClick={() => playerAnswer(3)}>
            <div className="answer-label">D</div>
          </div>
        </div>
      )}
      {!showResult && answered && <h1>Submited. Waiting for others!</h1>}
      {showResult && (
        <div className="question-answer">
          <img src={isCorrect ? "/img/true.png" : "/img/false.png"}/>
          <h1 className="question-tf">{isCorrect ? "Đúng" : "Sai"}</h1>
          <p>{isCorrect ? "+ 100 " : "+ 0 "} point</p>
          <h3>Bạn đang ở vị trí số 1</h3>
        </div>
      )}
      <div className="question-footer">
        <div className="player-name">{player.name}</div>
        <div className="player-score">{player.score}</div>
        {/* <div>PIN: {game.pin}</div> */}
      </div>
    </div>
  );
};

export default PlayGame;
