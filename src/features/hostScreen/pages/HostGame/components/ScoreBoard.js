import React from "react";
import "./styles.scss";

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
              return (
                <div className="score-bar" key={index}>
                  <div>{player.name}</div>
                  <div>{player.score}</div>
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
