import React from "react";
import "./styles.scss";

const FlashIcon = () => (
  <svg
    width="12"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    style={{ marginLeft: "4px", fill: "#e21b3c" }}
  >
    <path d="M381.2 172.8C377.1 164.9 368.9 160 360 160h-156.6l50.84-127.1c2.969-7.375 2.062-15.78-2.406-22.38S239.1 0 232 0h-176C43.97 0 33.81 8.906 32.22 20.84l-32 240C-.7179 267.7 1.376 274.6 5.938 279.8C10.5 285 17.09 288 24 288h146.3l-41.78 194.1c-2.406 11.22 3.469 22.56 14 27.09C145.6 511.4 148.8 512 152 512c7.719 0 15.22-3.75 19.81-10.44l208-304C384.8 190.2 385.4 180.7 381.2 172.8z" />
  </svg>
);

const ScoreBoard = ({ playersInGame, nextQuestion, endGame, game }) => {
  return (
    <div className="game__screen">
      <div className="question-info">
        <h1 className="question">Bảng điểm</h1>
      </div>
      <div className="question-body-container">
        <div className="next-btn" onClick={endGame || nextQuestion}>
          {!endGame ? "Tiếp" : "Kết thúc"}
        </div>
        <div className="score-bars">
          {playersInGame
            .sort((a, b) => b.score - a.score)
            .map((player, index) => {
              const streak = player.answers.reduce((acc, curr) => {
                if (curr.isCorrect) {
                  return acc + 1;
                }
                return 0;
              }, 0);
              return (
                <div
                  className="score-bar"
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    <span style={{ marginRight: "10px" }}>{player.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "16px",
                    }}
                  >
                    {streak > 1 && (
                      <>
                        <span style={{ fontWeight: 400, marginRight: "3px" }}>
                          {streak}
                        </span>
                        <FlashIcon />
                      </>
                    )}
                    <span style={{ marginLeft: "10px" }}>{player.score}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="question-footer">
        {game.questionIndex + 1}/{game.questionsLength}
        <div>PIN: {game.pin}</div>
      </div>
    </div>
  );
};

export default ScoreBoard;
