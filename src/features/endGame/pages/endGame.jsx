import React from "react";
import { Link } from "react-router-dom";
const _ = require("lodash");
import { useEffect } from "react";
import { Progress, List, Row, Col, Tabs, Button } from "antd";

import reportApi from "../../../api/reportApi";
import "./indexEndGame.scss";

const checkIsCorrectAnswer = (
  answer,
  { type, correctAnswer, reportQuestionAnswers: answers }
) => {
  if (type === "TYPE_ANSWER") {
    return (
      answers[correctAnswer].answer.toLowerCase().trim() ===
      `${answer.toLowerCase().trim()}`
    );
  }
  return (
    _.difference(
      correctAnswer.split("|").filter((a) => a),
      answer.split("|").filter((a) => a)
    ).length === 0
  );
};

const getPlayerCorrectAnswers = ({ answers, questions }) => {
  let sum = 0;
  answers.forEach((answer, index) => {
    const isCorrect = checkIsCorrectAnswer(answer.answer, questions[index]);
    if (isCorrect) {
      sum += 1;
    }
  });
  return sum;
};

const sumAnswers = (arr) => {
  const obj = [0, 0, 0, 0];
  arr.forEach((item) => {
    const answers =
      item.playerAnswers[item.playerAnswers.length - 1].answer.split("|");
    answers.forEach((answer) => {
      obj[answer] += 1;
    });
  });
  return obj;
};

const sumAnswersTypeAnswerQuestion = (playerAnswerResult, correctAnswer) => {
  let sum = 0;
  playerAnswerResult.forEach((item) => {
    const answer = item.playerAnswers[item.playerAnswers.length - 1].answer;
    if (correctAnswer === answer) {
      sum += 1;
    }
  });
  return sum;
};

const Endgame = ({ reportId }) => {
  const [reportData, setReportData] = React.useState({
    players: [],
    reportQuestions: [],
  });

  useEffect(() => {
    const getReportDetail = async () => {
      const res = await reportApi.getOne(reportId);
      console.log(res);
      setReportData(res);
    };

    getReportDetail();
  }, []);

  return (
    <div className="end-game__main">
      <div className="container">
        <Tabs defaultActiveKey="2" type="card">
          <Tabs.TabPane tab="Người tham gia" key="1">
            <div className="table">
              <Row className="table-header">
                <Col className="player-index" span={3}></Col>
                <Col className="player-name" span={5}>
                  <strong>Tên</strong>
                </Col>
                <Col
                  className="player-name"
                  span={6}
                  style={{ textAlign: "center" }}
                >
                  <strong>Đúng</strong>
                </Col>
                <Col className="player-progress" span={6}></Col>
                <Col
                  className="player-score"
                  span={4}
                  style={{ textAlign: "center" }}
                >
                  <strong>Điểm</strong>
                </Col>
              </Row>
              <div className="list-player">
                <List
                  dataSource={reportData.players}
                  renderItem={(player, index) => {
                    const percent = getPlayerCorrectAnswers({
                      answers: player.playerAnswers,
                      questions: reportData.reportQuestions,
                    });
                    return (
                      <List.Item>
                        <Row
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Col className="player-index" span={3}>
                            {index < 3 && <strong>{index + 1}</strong>}
                          </Col>
                          <Col className="player-name" span={5}>
                            <strong>{player.name}</strong>
                          </Col>
                          <Col
                            className="player-name"
                            span={6}
                            style={{ textAlign: "center" }}
                          >
                            <strong>
                              {percent} / {reportData.reportQuestions.length}
                            </strong>
                          </Col>
                          <Col
                            className="player-progress"
                            span={6}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Progress
                              type="circle"
                              percent={
                                ((percent / reportData.reportQuestions.length) *
                                  100) |
                                0
                              }
                              success={{
                                percent:
                                  ((percent /
                                    reportData.reportQuestions.length) *
                                    100) |
                                  0,
                              }}
                              width={50}
                            />
                          </Col>
                          <Col
                            className="player-score"
                            span={4}
                            style={{ textAlign: "center" }}
                          >
                            <strong>{player.score}</strong>
                          </Col>
                        </Row>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Câu hỏi" key="2">
            <div className="table">
              <Row className="table-header">
                <Col className="player-index" span={3}></Col>
                <Col className="player-score" span={13}>
                  <strong>Câu hỏi</strong>
                </Col>
                <Col className="player-progress" span={8}>
                  Phần trăm trả lời đúng
                </Col>
              </Row>
              <div className="list-player">
                <List
                  dataSource={[...reportData.reportQuestions]}
                  renderItem={(question, index) => {
                    let countCorrectAnswers = 0;

                    if (question.type === "TYPE_ANSWER") {
                      countCorrectAnswers = sumAnswersTypeAnswerQuestion(
                        reportData.players,
                        question.correctAnswer
                      );
                    } else {
                      countCorrectAnswers = sumAnswers(
                        reportData.players || []
                      )[question.correctAnswer];
                    }
                    return (
                      <List.Item>
                        <Row
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Col className="player-index" span={3}>
                            <strong>{index + 1}</strong>
                          </Col>
                          <Col className="player-name" span={13}>
                            <strong>{question.question}</strong>
                          </Col>
                          <Col
                            className="player-progress"
                            span={8}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Progress
                              type="circle"
                              percent={
                                ((countCorrectAnswers /
                                  reportData.reportQuestions.length) *
                                  100) |
                                0
                              }
                              success={{
                                percent:
                                  ((countCorrectAnswers /
                                    reportData.reportQuestions.length) *
                                    100) |
                                  0,
                              }}
                              width={50}
                            />
                          </Col>
                        </Row>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
        <div className="footer">
          <Link to="/quiz">
            <Button size="large" type="primary">
              Kết thúc
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Endgame;
