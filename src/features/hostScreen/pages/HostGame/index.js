import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TotalAnswerResult from "./components/TotalAnswerResult";
import ScoreBoard from "./components/ScoreBoard";
import GameAnswers from "./components/GameAnswers";

import "../../styles.scss";

const gameStateTypes = {
  LIVE_QUESTION: "liveQuestion",
  QUESTION_RESULT: "questionResult",
  SCORE_BOARD: "scoreBoard",
  GAME_OVER: "gameOver",
};

const HostGame = ({ socket }) => {
  const [question, setQuestion] = useState(null);
  const [game, setGame] = useState({});

  const [players, setPlayers] = React.useState([]);
  const [gameState, setGameState] = React.useState(
    gameStateTypes.LIVE_QUESTION
  );
  const [questionResult, setQuestionResult] = React.useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("host-start-game", { id: params.id });

    socket.on("no-game-found", function () {
      navigate(`/quiz`);
    });

    socket.on("question-info", (question, game) => {
      if (game) {
        setGame(game);
      }
      setGameState(gameStateTypes.LIVE_QUESTION);
      setQuestion(question);
      setQuestionResult([]);
    });

    socket.on("players-answered", ({ playersInGame, playersAnswered }) => {
      setPlayers({ playersInGame, playersAnswered });
    });

    socket.on("question-over", (res, answer) => {
      setGameState(gameStateTypes.QUESTION_RESULT);
      setQuestionResult(res);
    });

    socket.on("game-over-host", () => {
      setGameState(gameStateTypes.GAME_OVER);
    });

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const endGame = () => {
    socket.emit("disconnect", socket.id);
    navigate(`/quiz`);
  };

  const showScoreBoard = () => {
    setGameState(gameStateTypes.SCORE_BOARD);
  };

  const nextQuestion = () => {
    socket.emit("next-question");
  };

  // const { question, gameData, questionResult, gameOver } = state;

  const imageContent = (
    <div className="question-image">
      <div className="time">18</div>
      <div className="image no-image">
        <img src="/img/logo-large.png" />
      </div>
      <div className="player-answered">
        {players.playersAnswered}/{players.playersInGame}
        <br /> người đã trả lời
      </div>
    </div>
  );

  if (!question) {
    return "";
  }

  switch (gameState) {
    case gameStateTypes.GAME_OVER:
    case gameStateTypes.SCORE_BOARD:
      return (
        <ScoreBoard
          question={question}
          questionResult={questionResult}
          nextQuestion={nextQuestion}
          endGame={gameState === gameStateTypes.GAME_OVER ? endGame : null}
          game={game}
        />
      );
    default:
      return (
        <div className="game__screen">
          <div className="question-info">
            <h1 className="question">{question.question}</h1>
          </div>
          <div className="question-body-container">
            {gameState !== gameStateTypes.LIVE_QUESTION && (
              <div className="next-btn" onClick={showScoreBoard}>
                Tiếp
              </div>
            )}
            {gameState === gameStateTypes.QUESTION_RESULT ? (
              <TotalAnswerResult
                question={question}
                questionResult={questionResult}
                questionIndex={game.questionIndex}
              />
            ) : (
              imageContent
            )}
          </div>
          <GameAnswers
            question={question}
            gameStateTypes={gameStateTypes}
            gameState={gameState}
          />
          <div className="question-footer">
            <div>
              {game.questionIndex + 1}/{game.questionsLength}
            </div>
            <div>PIN: {game.pin}</div>
          </div>
        </div>
      );
  }
};

export default HostGame;
