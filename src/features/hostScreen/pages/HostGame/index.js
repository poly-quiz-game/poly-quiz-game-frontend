import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TotalAnswerResult from "./components/TotalAnswerResult";
import ScoreBoard from "./components/ScoreBoard";

import "../../styles.scss";

const gameStates = {
  LIVE_QUESTION: "liveQuestion",
  QUESTION_RESULT: "questionResult",
  SCORE_BOARD: "scoreBoard",
  GAME_OVER: "gameOver",
};

const HostGame = ({ socket }) => {
  const [question, setQuestion] = useState({});
  const [quiz, setQuiz] = useState({});
  const [game, setGame] = useState({});

  const [players, setPlayers] = React.useState([]);
  const [gameState, setGameState] = React.useState(gameStates.LIVE_QUESTION);
  const [questionResult, setQuestionResult] = React.useState({});
  const [correctAnswer, setCorrectAnswer] = React.useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("host-join-game", { id: params.id });

    socket.on("noRoomFound-host", function () {
      navigate(`/quiz`);
    });
    socket.on("noGameFound-host", function () {
      alert("noGameFound-host");
      navigate(`/quiz`);
    });

    socket.on("gameQuestion-host", (res) => {
      setGameState(gameStates.LIVE_QUESTION);
      setQuestion(res);
      setCorrectAnswer(null);
      setQuestionResult([]);
    });

    socket.on(
      "updatePlayersAnswered-host",
      ({ playersInGame, playersAnswered }) => {
        setPlayers({ playersInGame, playersAnswered });
      }
    );

    socket.on("quizInfo-host", (res) => {
      setQuiz(res);
    });

    socket.on("gameInfo-host", (res) => {
      setGame(res);
      // dispatch({ type: "getGameData", payload: res });
    });

    socket.on("questionOver-all", (res, answer) => {
      setGameState(gameStates.QUESTION_RESULT);
      setQuestionResult(res);
      setCorrectAnswer(answer);
    });

    socket.on("GameOver-host", (res, player) => {
      setGameState(gameStates.GAME_OVER);
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
    setGameState(gameStates.SCORE_BOARD);
  };

  const nextQuestion = () => {
    socket.emit("host-nextQuestion");
  };

  // const { question, gameData, questionResult, gameOver } = state;

  const imageContent = (
    <div className="question-image">
      <div className="time">18</div>
      <div className="image">
        <img src="https://i.picsum.photos/id/407/632/336.jpg?hmac=UxaQKtYZZzwSwt9KYntbc0EA6DZhUBISmne3bnaUwUw" />
      </div>
      <div className="player-answered">
        {players.playersAnswered}/{players.playersInGame}
        <br /> người đã trả lời
      </div>
    </div>
  );


  switch (gameState) {
    case gameStates.GAME_OVER:
    case gameStates.SCORE_BOARD:
      return (
        <ScoreBoard
          question={question}
          questionResult={questionResult}
          nextQuestion={nextQuestion}
          endGame={gameState === gameStates.GAME_OVER ? endGame : null}
          game={game}
        />
      );
    default:
      return (
        <div
          className="game__screen"
          // style={{
          //   background:
          //     // "url(https://i.picsum.photos/id/819/1440/1024.jpg?hmac=KQQFhYlcPEz5zJkj8PqhWkieZ4FgO56TdT8sCou59JI)",
          //     quiz.backgroundImage
          //       ? `url("${quiz.backgroundImage}") center center / cover no-repeat rgb(204, 204, 204)`
          //       : "",
          // }}
        >
          <div className="question-info">
            <h1 className="question">{question.question || "123"}</h1>
          </div>
          <div className="question-body-container">
            {gameState !== gameStates.LIVE_QUESTION && (
              <div className="next-btn" onClick={showScoreBoard}>
                Tiếp
              </div>
            )}
            {gameState === gameStates.QUESTION_RESULT ? (
              <TotalAnswerResult
                questionResult={questionResult}
                questionIndex={game.questionIndex}
              />
            ) : (
              imageContent
            )}
          </div>
          <div className="answers">
            <div
              className={`answer answer-1 ${
                correctAnswer === 0 ? "correct" : ""
              }`}
            >
              <div className="answer-label">A</div>
              <div className="answer-content">
                {(question.answers || [])[0]}
              </div>
            </div>
            <div
              className={`answer answer-2 ${
                correctAnswer === 1 ? "correct" : ""
              }`}
            >
              <div className="answer-label">B</div>
              <div className="answer-content">
                {(question.answers || [])[1]}
              </div>
            </div>
            <div
              className={`answer answer-3 ${
                correctAnswer === 2 ? "correct" : ""
              }`}
            >
              <div className="answer-label">C</div>
              <div className="answer-content">
                {(question.answers || [])[2]}
              </div>
            </div>
            <div
              className={`answer answer-4 ${
                correctAnswer === 3 ? "correct" : ""
              }`}
            >
              <div className="answer-label">D</div>
              <div className="answer-content">
                {(question.answers || [])[3]}
              </div>
            </div>
          </div>
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
