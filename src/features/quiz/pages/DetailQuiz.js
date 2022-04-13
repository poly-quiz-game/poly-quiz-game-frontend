import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Button, Collapse, Skeleton } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { questionTypeLabels } from "consts";
import {
  PlayCircleOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  EditOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getTimeString } from "../../../utils";

import MainLayout from "layouts/main.layout";
import { Link } from "react-router-dom";

import Audio from "./CreateQuiz/Audio";

import { fetchQuiz, selectQuiz, remove } from "../quizSlice";

import "./detail.scss";
import { showDeleteConfirm } from "../../../confirm/DeleteConfirm";

const { Panel } = Collapse;

const QUESTION_COLORS = [
  "rgb(226, 27, 60)",
  "rgb(19, 104, 206)",
  "rgb(216, 158, 0)",
  "rgb(38, 137, 12)",
];

const QUESTION_LABELS = ["A", "B", "C", "D"];

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
          <Audio media={media} editable={false} />
        </div>
      );
    case "video":
      return (
        <div
          style={{
            width: "180px",
            height: "120px",
            position: "relative",
          }}
        >
          <iframe
            frameBorder="0"
            allowFullScreen="1"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title="YouTube video player"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${media.url}?mute=0&controls=0&start=${media.startTime}&end=${media.endTime}&playsinline=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=1&enablejsapi=1&widgetid=43`}
            id="widget46"
          ></iframe>
        </div>
      );
    default:
      return null;
  }
};

const DetailQuiz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const quiz = useSelector(selectQuiz);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      await dispatch(fetchQuiz(params.id));
      setLoading(false);
    };
    fetchApi();
  }, [dispatch, params]);

  return (
    <MainLayout
      title={quiz.name ? `${quiz.name} | Poly Quiz Game` : ""}
      loading={quiz.loading}
      active
    >
      <div style={{ padding: "24px 0" }} className="detail-quiz">
        {loading ? (
          <div className="loading">
            <Skeleton title={false} loading={loading} active></Skeleton>
            <Skeleton title={false} loading={loading} active></Skeleton>
          </div>
        ) : (
          <div>
            <div className="question-header">
              <div className="question-header-top" style={{ padding: "12px" }}>
                <div>
                  <img src={quiz.coverImage || "/quiz.png"} width="200px" />
                </div>
                <div className="header-title-content">
                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ maxWidth: "70%" }}>
                      <h2>{quiz.name}</h2>
                    </div>
                    <div className="button-icon">
                      <Link to={`/quiz/update/${quiz.id}`}>
                        <Button icon={<EditOutlined />}>Sửa</Button>
                      </Link>
                      <Button
                        danger
                        style={{ marginLeft: "8px" }}
                        onClick={() =>
                          showDeleteConfirm(quiz.name, async () => {
                            await dispatch(remove(quiz.id));
                            navigate("/quiz");
                          })
                        }
                        icon={<DeleteOutlined />}
                      >
                        Xóa
                      </Button>
                    </div>
                  </div>
                  <div className="description">
                    <h5>{quiz.description}</h5>
                  </div>
                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ marginRight: "16px" }}>
                      <PlayCircleOutlined /> {quiz?.reports?.length} lượt chơi
                    </div>
                    <div style={{ marginRight: "16px" }}>
                      <QuestionCircleOutlined /> {quiz?.questions?.length} câu
                      hỏi
                    </div>
                    <div style={{ marginRight: "16px" }}>
                      <CalendarOutlined /> {getTimeString(quiz.updatedAt)}
                    </div>
                    <div style={{ marginRight: "16px" }}>
                      <UserOutlined /> Tối đa {quiz.numberOfPlayer} người
                    </div>
                    {quiz.needLogin && (
                      <div style={{ marginRight: "16px" }}>
                        <LockOutlined /> Bắt buộc đăng nhập
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px", textAlign: "right" }}>
                <Link
                  to={`/host/start/${quiz.id}`}
                  style={{ color: "#fff", fontSize: "14px" }}
                >
                  <Button type="primary">Bắt đầu game</Button>
                </Link>
              </div>
            </div>

            <div
              style={{
                margin: "0px auto 24px",
                width: "80%",
                maxWidth: "1000px",
              }}
            >
              <div
                className="question"
                style={{
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  Câu hỏi <span>({quiz.questions?.length})</span>
                </div>
              </div>
              {(quiz.questions || []).map((qt, i) => (
                <Collapse
                  key={i}
                  expandIconPosition="right"
                  style={{ marginBottom: "16px" }}
                >
                  <Panel
                    header={
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ color: "#444" }}>
                            {i + 1 + ". " + questionTypeLabels[qt.type.name]} -{" "}
                            {qt.timeLimit / 1000} giây
                          </div>
                          <h1>
                            {qt.question?.length > 80
                              ? qt.question.substring(0, 75) + "..."
                              : qt.question}
                          </h1>
                        </div>

                        {qt.media && <Media media={qt.media} />}
                      </div>
                    }
                    style={{ marginButton: "16px" }}
                  >
                    <div className="quizzquestion-bottom">
                      {qt.type.name == "TRUE_FALSE_ANSWER"
                        ? (qt.answers.slice(0, 2) || []).map((as, index) => (
                            <div className="answer" key={index}>
                              <div className="answer-question">
                                <div
                                  className="answer-question-left"
                                  style={{ background: QUESTION_COLORS[index] }}
                                >
                                  <h3 style={{ color: "#fff" }}>
                                    {QUESTION_LABELS[index]}
                                  </h3>
                                </div>
                                <div className="answer-question-right">
                                  <h4>{as.answer}</h4>
                                </div>
                              </div>

                              {Number(qt.correctAnswer) === as.index ? (
                                <i className="fas fa-check"></i>
                              ) : (
                                <i className="fas fa-times"></i>
                              )}
                            </div>
                          ))
                        : qt.type.name === "SINGLE_CORRECT_ANSWER" ||
                          qt.type.name === "MULTIPLE_CORRECT_ANSWER"
                        ? (qt.answers || []).map((as, index) => (
                            <div className="answer" key={index}>
                              <div className="answer-question">
                                <div
                                  className="answer-question-left"
                                  style={{ background: QUESTION_COLORS[index] }}
                                >
                                  <h3 style={{ color: "#fff" }}>
                                    {QUESTION_LABELS[index]}
                                  </h3>
                                </div>
                                <div className="answer-question-right">
                                  <div>{as.answer}</div>
                                </div>
                              </div>
                              {qt.type.name == "SINGLE_CORRECT_ANSWER" ? (
                                Number(qt.correctAnswer) === as.index ? (
                                  <i className="fas fa-check"></i>
                                ) : (
                                  <i className="fas fa-times"></i>
                                )
                              ) : qt.correctAnswer.search(index) != -1 ? (
                                <i className="fas fa-check"></i>
                              ) : (
                                <i className="fas fa-times"></i>
                              )}
                            </div>
                          ))
                        : (qt.answers.slice(0, 1) || []).map((as, index) => (
                            <div className="answer" key={index}>
                              <div className="answer-question">
                                <div
                                  className="answer-question-left"
                                  style={{ background: QUESTION_COLORS[index] }}
                                >
                                  <h3 style={{ color: "#fff" }}>
                                    {QUESTION_LABELS[index]}
                                  </h3>
                                </div>
                                <div className="answer-question-right">
                                  <h4>{as.answer}</h4>
                                </div>
                              </div>
                              {Number(qt.correctAnswer) === as.index ? (
                                <i className="fas fa-check"></i>
                              ) : (
                                <i className="fas fa-times"></i>
                              )}
                            </div>
                          ))}
                    </div>
                  </Panel>
                </Collapse>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetailQuiz;
