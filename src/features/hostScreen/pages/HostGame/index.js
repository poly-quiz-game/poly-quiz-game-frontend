import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TotalAnswerResult from "./components/TotalAnswerResult";
import ScoreBoard from "./components/ScoreBoard";
import GameAnswers from "./components/GameAnswers";
import EndGame from "./components/EndGame";
import liveQuestionSound from "../../../../assets/question_live_sound_2.mp3";
import endQuestionSound from "../../../../assets/end_question_sound.mp3";

import "../../styles.scss";

export const gameStateTypes = {
  LIVE_QUESTION: "liveQuestion",
  QUESTION_RESULT: "resultQuestion",
  SCORE_BOARD: "scoreBoard",
  GAME_OVER: "gameOver",
};

const HostGame = ({ socket }) => {
  const [question, setQuestion] = useState(null);
  const [game, setGame] = useState({});
  const [time, setTime] = useState(-1);
  const [audioOn, setAudioOn] = useState(true);

  const [players, setPlayers] = React.useState([]);
  const [gameState, setGameState] = React.useState(
    gameStateTypes.LIVE_QUESTION
  );
  const [playersInGame, setPlayersInGame] = React.useState({});
  const [report, setReport] = React.useState(null);

  const params = useParams();
  const navigate = useNavigate();
  const timer = useRef(null);
  const prevTime = useRef(null);

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
      setPlayersInGame([]);
      setTime(question.timeLimit / 1000);
    });

    socket.on("players-answered", ({ playersInGame, playersAnswered }) => {
      setPlayers({ playersInGame, playersAnswered });
    });

    socket.on(
      "get-player-answered-time",
      (playerId, question, answerString) => {
        socket.emit("player-answered-time", {
          playerId,
          time: prevTime.current,
          question,
          answerString,
        });
      }
    );

    socket.on("question-over", () => {
      setGameState(gameStateTypes.QUESTION_RESULT);
      setPlayersInGame([]);
      setTime(null);
      socket.emit("get-score-board");
    });

    socket.on("score-board", (playersInGame) => {
      setPlayersInGame(playersInGame);
      setTime(null);
    });

    socket.on("game-over-host", (rank, playersInGame, report) => {
      setReport(report);
      setGameState(gameStateTypes.GAME_OVER);
    });

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  useEffect(() => {
    if (time !== prevTime.current && time !== null) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    prevTime.current = time;
    if (time === 0) {
      socket.emit("time-up");
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [time]);

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

  const skipQuestion = () => {
    socket.emit("time-up");
  };

  if (!question) {
    return "";
  }

  switch (gameState) {
    case gameStateTypes.LIVE_QUESTION:
    case gameStateTypes.QUESTION_RESULT:
      return (
        <div
          className="game__screen"
          style={{ backgroundImage: `url(${game?.quizData?.backgroundImage})` }}
        >
          {audioOn && gameState === gameStateTypes.LIVE_QUESTION && (
            <audio autoPlay loop>
              <source src={liveQuestionSound} type="audio/mpeg" />
            </audio>
          )}
          {audioOn && gameState === gameStateTypes.QUESTION_RESULT && (
            <audio autoPlay>
              <source src={endQuestionSound} type="audio/mpeg" />
            </audio>
          )}
          <div className="question-info">
            <h1 className="question">{question.question}</h1>
          </div>
          <div className="question-body-container">
            {gameState !== gameStateTypes.LIVE_QUESTION && (
              <div className="next-btn" onClick={showScoreBoard}>
                Tiếp
              </div>
            )}
            {gameState === gameStateTypes.LIVE_QUESTION && (
              <div className="next-btn" onClick={skipQuestion}>
                Bỏ qua
              </div>
            )}
            {gameState === gameStateTypes.QUESTION_RESULT ? (
              <TotalAnswerResult
                question={question}
                playersInGame={playersInGame}
                questionIndex={game.questionIndex}
              />
            ) : (
              <div className="question-image">
                <div className="time">{time}</div>
                <div className={`image ${!question.image ? "no-image" : ""}`}>
                  <img src={question?.image || "/img/logo-large.png}"} />
                </div>
                <div className="player-answered">
                  {players.playersAnswered}/{players.playersInGame}
                  <br /> người đã trả lời
                </div>
              </div>
            )}
          </div>
          <GameAnswers question={question} gameState={gameState} />
          <div className="question-footer">
            <div>
              {game.questionIndex + 1}/{game.questionsLength}
            </div>
            <div>PIN: {game.pin}</div>
          </div>
        </div>
      );
    case gameStateTypes.SCORE_BOARD:
      return (
        <ScoreBoard
          question={question}
          playersInGame={playersInGame}
          nextQuestion={nextQuestion}
          endGame={gameState === gameStateTypes.GAME_OVER ? endGame : null}
          game={game}
        />
      );
    case gameStateTypes.GAME_OVER:
      return <EndGame report={report} />;
  }
};

export default HostGame;
