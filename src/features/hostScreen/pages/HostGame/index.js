import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import {
  useNavigate,
  useParams,
  UNSAFE_NavigationContext as NavigationContext,
} from "react-router-dom";
import ReactHowler from "react-howler";

import Audio from "../../../quiz/pages/CreateQuiz/Audio";

import TotalAnswerResult from "./components/TotalAnswerResult";
import ScoreBoard from "./components/ScoreBoard";
import GameAnswers from "./components/GameAnswers";
import EndGame from "./components/EndGame";
import liveQuestionSound from "../../../../assets/question_live_sound_2.mp3";
import endQuestionSound from "../../../../assets/end_question_sound.mp3";

import "../../styles.scss";

const Media = ({ media }) => {
  switch (media.type) {
    case "image":
      return (
        <div
          style={{
            width: "180px",
            height: "120px",
            position: "relative",
          }}
        >
          <div className="image">
            <img src={media.url} width="100%" height="auto" />
          </div>
        </div>
      );
    case "audio":
      return (
        <div
          style={{
            width: "180px",
            height: "120px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Audio media={media} editable={false} autoplay />
        </div>
      );
    case "video":
      return (
        <div
          style={{
            width: "500px",
            height: "300px",
            position: "relative",
          }}
        >
          <iframe
            frameBorder="0"
            allowFullScreen="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            width="100%"
            height="100%"
            src={`https://www.youtube-nocookie.com/embed/${media.url}?start=${media.startTime}&end=${media.endTime}&autoplay=1&mute=0&controls=0&playsinline=0&showinfo=0&rel=0&modestbranding=1&fs=1&enablejsapi=1&widgetid=43`}
          />
        </div>
      );
    default:
      return null;
  }
};

export function useBlocker(blocker, when = true) {
  const { navigator } = useContext(NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // Automatically unblock the transition so it can play all the way
          // through before retrying it. TODO: Figure out how to re-enable
          // this block if the transition is cancelled for some reason.
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
export function usePrompt(message, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}

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
  const [loading, setLoading] = useState(false);

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

  usePrompt(
    "Bạn có chắc muốn thoát game này không?",
    socket.connected && gameState !== gameStateTypes.GAME_OVER
  );

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      console.log("quit game");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.emit("host-start-game", { id: params.id });

    socket.on("no-game-found", function () {
      navigate(`/quiz`);
    });

    socket.on("question-info", (question, game) => {
      setLoading(false);
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
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
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
    socket.disconnect();
    navigate(`/quiz`);
  };

  const showScoreBoard = () => {
    setGameState(gameStateTypes.SCORE_BOARD);
  };

  const nextQuestion = () => {
    setLoading(true);
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
          style={{
            backgroundImage: `url(${game?.quizData?.backgroundImage}); backgroundSize: cover`,
          }}
        >
          {!question.media &&
            audioOn &&
            gameState === gameStateTypes.LIVE_QUESTION && (
              <ReactHowler
                src={liveQuestionSound}
                playing
                loop
                type="audio/mpeg"
                volume={0.2}
              />
            )}
          {audioOn && gameState === gameStateTypes.QUESTION_RESULT && (
            <ReactHowler src={endQuestionSound} playing type="audio/mpeg" />
          )}
          <div className="question-info">
            <h1 className="question">{question.question}</h1>
          </div>
          <div className="question-body-container">
            {gameState !== gameStateTypes.LIVE_QUESTION && (
              <div className={`next-btn ${loading ? 'loading' : ''}`} onClick={showScoreBoard}>
                Tiếp
              </div>
            )}
            {gameState === gameStateTypes.LIVE_QUESTION && (
              <div className={`next-btn ${loading ? 'loading' : ''}`} onClick={skipQuestion}>
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
                {question.media ? (
                  <Media media={question.media} />
                ) : (
                  <div className={`image ${!question.image ? "no-image" : ""}`}>
                    <img src={question?.image || "/img/logo-large.png"} />
                  </div>
                )}
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
          loading={loading}
        />
      );
    case gameStateTypes.GAME_OVER:
      return <EndGame report={report} />;
  }
};

export default HostGame;
