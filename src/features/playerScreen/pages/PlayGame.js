import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { questionTypes } from "consts";

import "../styles.scss";

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
  const [game, setGame] = useState({});
  const [question, setQuestion] = useState({});

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

    // socket.on("answerResult-player", (result) => {
    //   setIsCorrect(result);
    // });

    socket.on("player-info", (player) => {
      setPlayer(player);
    });

    socket.on("question-started", (question) => {
      console.log("gameStarted-player", question);
      setQuestion(question);
    });

    socket.on("question-over", (isCorrect, player) => {
      setIsCorrect(isCorrect);
      setShowResult(true);
      setPlayer(player);
    });

    socket.on("next-question", () => {
      setAnswered(false);
      setIsCorrect(false);
      setShowResult(false);
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
        <div className="player-name">{player.name}</div>
        <div className="player-score">{player.score}</div>
      </div>
      {!answered && (
        <div className="answers">
          {(question.type === questionTypes.TRUE_FALSE_ANSWER
            ? QUESTION_TRUE_FALSE_LABELS
            : QUESTION_LABELS
          ).map((label, index) => (
            <div
              className={`answer answer-${index + 1}`}
              key={index}
              onClick={() => playerAnswer(index.toString())}
            >
              <div className="answer-label">{label}</div>
            </div>
          ))}
        </div>
      )}
      {!showResult && answered && <h1>Submited. Waiting for others!</h1>}
      {showResult && <h1>{isCorrect ? "correct" : "incorrect"}</h1>}
      <div className="question-footer">
        <div></div>
        <div>PIN: {game.pin}</div>
      </div>
    </div>
  );
};

export default PlayGame;
