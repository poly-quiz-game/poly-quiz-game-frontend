import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../styles.scss";
import { questionTypeLabels, questionTypes } from "consts";

import SelectAnswers from "./SelectAnswers";
import TypeAnswer from "./TypeAnswer";

const antIcon = <LoadingOutlined style={{ fontSize: 111 }} spin />;

const QUESTION_LABELS = ["A", "B", "C", "D"];
const QUESTION_TRUE_FALSE_LABELS = ["A", "B"];

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
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(1);
  const [game, setGame] = useState({});
  const [question, setQuestion] = useState({});

  const prevScore = useRef(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.socketId) {
      socket.emit("player-join-game", { socketId: params.socketId });
    }

    socket.on("no-game-found", () => {
      navigate(`/play/enter-pin`);
    });

    socket.on("hostDisconnect-player", () => {
      navigate(`/play/enter-pin`);
    });

    socket.on("game-over", (playerData) => {
      setGameOver(true);
      setPlayerData(playerData);
    });

    socket.on("player-info", (player, game) => {
      setPlayer(player);
      setGame(game);
    });

    socket.on("player-score", ({ score, rank }) => {
      setScore(score);
      prevScore.current = score;
      setRank(rank);
    });

    socket.on("question-started", (question) => {
      setAnswered(false);
      setIsCorrect(false);
      setShowResult(false);
      setQuestion(question);
    });

    socket.on("question-over", (isCorrect) => {
      setIsCorrect(isCorrect);
      setAnswered(true);
      setShowResult(true);
      socket.emit("get-player-score");
    });

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const playerAnswer = (answer) => {
    setAnswered(true);
    socket.emit("player-answer", answer);
  };

  if (gameOver) {
    return (
      <div className="game__screen">
        <Row>
          <Col span={20} offset={2}>
            <h1>Game over!</h1>
            <p>Điểm đạt được: {playerData.score}</p>
            <Link to="/play/enter-pin">Thoát</Link>
          </Col>
        </Row>
      </div>
    );
  }

  const Answers =
    question?.type?.name === questionTypes.TYPE_ANSWER
      ? TypeAnswer
      : SelectAnswers;

  return (
    <div className="player-game__screen">
      <div className="player-info">
        <div className="player-name">
          {questionTypeLabels[question?.type?.name]}
        </div>
        <div className="player-score">{score}</div>
      </div>
      {!answered && (
        <Answers
          type={question?.type?.name}
          playerAnswer={playerAnswer}
          labels={
            question?.type?.name === questionTypes.TRUE_FALSE_ANSWER
              ? QUESTION_TRUE_FALSE_LABELS
              : QUESTION_LABELS
          }
        />
      )}
      {!showResult && answered && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "calc(40vh - 93px)",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
          <br />
          <h3 style={{ textAlign: "center" }}>Chờ người chơi khác</h3>
        </>
      )}
      {showResult && (
        <div className="question-answer">
          {isCorrect ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              style={{ width: "100px", fill: "#56d17e" }}
            >
              <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              style={{ width: "100px", fill: "#e21b3c" }}
            >
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
          )}
          <h1 style={{ color: "#fff" }} className="question-tf">
            {isCorrect ? "Đúng" : "Sai"}
          </h1>
          <p>{isCorrect ? `+ ${score - prevScore.current} ` : "+ 0 "} point</p>
          <h3 style={{ color: "#fff" }}>Bạn đang ở vị trí số {rank}</h3>
        </div>
      )}
      <div className="question-footer">
        <div className="player-name">{player.name}</div>
        <div className="player-score">{player.score}</div>
      </div>
    </div>
  );
};

export default PlayGame;
