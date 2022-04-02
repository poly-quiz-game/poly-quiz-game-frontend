import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Space, Button, Layout, Menu, Image, Collapse, Skeleton } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaUserAlt, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  CaretRightOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { questionTypeLabels, questionTypes } from "consts";

import MainLayout from "layouts/main.layout";
import { Link } from "react-router-dom";

import { fetchQuiz, selectQuiz, remove } from "../quizSlice";

import "./detail.css";
import { showDeleteConfirm } from "../../../confirm/DeleteConfirm";
const { Content, Sider } = Layout;
const { Panel } = Collapse;
const CorrectIcon = (
  <span style={{ color: "#52c41a" }}>
    <CheckCircleFilled />
  </span>
);

const IncorretIcocn = (
  <span style={{ color: "#eb2f96" }}>
    <CloseCircleFilled />
  </span>
);
const QUESTION_COLOR = [
  { border: "2px solid rgb(226, 27, 60)" },
  { border: "2px solid rgb(19, 104, 206)" },
  { border: "2px solid rgb(216, 158, 0)" },
  { border: "2px solid rgb(38, 137, 12)" },
];

const QUESTION_LABELS = ["A", "B", "C", "D"];

const DetailQuiz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const quiz = useSelector(selectQuiz);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await dispatch(fetchQuiz(params.id));
    await setLoading(false);
  }, [dispatch, params]);

  return (
    <>
      <MainLayout
        title={quiz.name ? `${quiz.name} | Poly Quiz Game` : ""}
        loading={quiz.loading}
        active
      >
        {loading ? (
          <div className="loading">
            <Skeleton title={false} loading={loading} active></Skeleton>
            <Skeleton title={false} loading={loading} active></Skeleton>
          </div>
        ) : (
          <Layout>
            <Layout>
              <div className="question-header">
                <div className="question-header-top">
                  <Image
                    style={{
                      borderRadius: "4px",
                      width: "150px",
                      margin: "15px 0px 0px 31px",
                    }}
                    src={
                      quiz.coverImage === ""
                        ? "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
                        : quiz.coverImage
                    }
                  />
                  <div className="header-title-content">
                    <div className="title number-play">
                      <h2>
                        <span>Tên:</span>
                        {quiz.name?.length > 18
                          ? quiz.name.substring(0, 15) + "..."
                          : quiz.name}
                      </h2>
                      <div className="button-icon">
                        <div className="quiz-edit-delete">
                          <Link
                            to={`/quiz/update/${quiz.id}`}
                            style={{ color: "black", fontSize: "14px" }}
                          >
                            <FaPencilAlt fontSize={11} />{" "}
                            <span style={{ paddingLeft: "3px" }}>Sửa</span>
                          </Link>
                        </div>
                        <div className="quiz-edit-delete">
                          <Space>
                            <DeleteOutlined
                              style={{
                                cursor: "pointer",
                                color: "black",
                              }}
                              onClick={() => {
                                showDeleteConfirm(quiz.name, async () => {
                                  await dispatch(remove(quiz.id));
                                  await dispatch(fetchQuiz());
                                  await navigate("/quiz");
                                });
                              }}
                            />
                            Xóa
                          </Space>
                        </div>
                      </div>
                    </div>
                    <div className="description">
                      <h5>
                        Mô tả: <span>{quiz.description}</span>
                      </h5>
                    </div>
                    <div className="content-title">
                      <div className="content">
                        <h4>{quiz.reports?.length} lượt chơi</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="question-header-bottom">
                  <div className="avata">
                    <img src={user.picture} />
                    <span>{user.name}</span>
                  </div>
                  <div className="button1">
                    <Button
                      className="button-start"
                      style={{ backgroundColor: "#416CDA", borderRadius: "4px" }}
                    >
                      <Link
                        to={`/host/start/${quiz.id}`}
                        style={{ color: "#fff", fontSize: "14px" }}
                      >
                        Bắt đầu game
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Layout style={{ margin: "0px 250px 24px" }}>
                <div className="question">
                  <h3>
                    Câu hỏi <span>({quiz.questions?.length})</span>
                  </h3>
                </div>
                {(quiz.questions || []).map((qt, i) => (
                  <Collapse
                    key={i}
                    defaultActiveKey={['1']}
                    bordered={false}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                    style={{ marginBottom: "16px" }}
                  >
                    <Panel
                      header={questionTypeLabels[qt.type.name]}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <div className="quizzquestion-top">
                        <div className="quizquestion-left">
                          <h5>
                            {qt.question?.length > 80
                              ? qt.question.substring(0, 75) + "..."
                              : qt.question}
                          </h5>
                          <div className="timeLimit">
                            <FieldTimeOutlined
                              style={{ fontSize: "20px", marginRight: "20px" }}
                            />
                            Thời gian trả lời: {qt.timeLimit / 1000} giây
                          </div>
                        </div>
                        <div className="quizquestion-right">
                          <Image
                            style={{
                              height: "119px",
                              paddingTop: "5px",
                              borderRadius: "4px",
                              marginRight: "20px",
                              display: "block",
                            }}
                            src={
                              qt.image === ""
                                ? "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
                                : qt.image
                            }
                          ></Image>
                        </div>
                      </div>
                      <div className="quizzquestion-bottom">
                        {qt.type.name == "TRUE_FALSE_ANSWER"
                          ? (qt.answers.slice(0, 2) || []).map((as, index) => (
                              <div className="answer" key={index}>
                                <div className="answer-question">
                                  <div
                                    className="answer-question-left"
                                    style={QUESTION_COLOR[index]}
                                  >
                                    <h3 color="#fff">
                                      {QUESTION_LABELS[index]}
                                    </h3>
                                  </div>
                                  <div className="answer-question-right">
                                    <h4>{as.answer}</h4>
                                  </div>
                                </div>

                                {Number(qt.correctAnswer) === as.index ? (
                                  <div className="answer-icon active"></div>
                                ) : (
                                  <div className="answer-icon"></div>
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
                                    style={QUESTION_COLOR[index]}
                                  >
                                    <h3 color="#fff">
                                      {QUESTION_LABELS[index]}
                                    </h3>
                                  </div>
                                  <div className="answer-question-right">
                                    <h4>{as.answer}</h4>
                                  </div>
                                </div>
                                {qt.type.name == "SINGLE_CORRECT_ANSWER" ? (
                                  Number(qt.correctAnswer) === as.index ? (
                                    <div className="answer-icon active"></div>
                                  ) : (
                                    <div className="answer-icon"></div>
                                  )
                                ) : qt.correctAnswer.search(index) != -1 ? (
                                  <div className="answer-icon active"></div>
                                ) : (
                                  <div className="answer-icon"></div>
                                )}
                              </div>
                            ))
                          : (qt.answers.slice(0, 1) || []).map((as, index) => (
                              <div className="answer" key={index}>
                                <div className="answer-question">
                                  <div
                                    className="answer-question-left"
                                    style={QUESTION_COLOR[index]}
                                  >
                                    <h3 color="#fff">
                                      {QUESTION_LABELS[index]}
                                    </h3>
                                  </div>
                                  <div className="answer-question-right">
                                    <h4>{as.answer}</h4>
                                  </div>
                                </div>
                                {Number(qt.correctAnswer) === as.index ? (
                                  <div className="answer-icon active"></div>
                                ) : (
                                  <div className="answer-icon"></div>
                                )}
                              </div>
                            ))}
                      </div>
                    </Panel>
                  </Collapse>
                ))}
              </Layout>
            </Layout>
          </Layout>
        )}
      </MainLayout>
    </>
  );
};

export default DetailQuiz;
