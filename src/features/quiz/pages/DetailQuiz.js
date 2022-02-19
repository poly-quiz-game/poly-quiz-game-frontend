import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Space, Button, Layout, Menu, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaUserAlt, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import MainLayout from "layouts/main.layout";
import { Link } from "react-router-dom";

import { fetchQuiz, selectQuiz, remove } from "../quizSlice";

import "./detail.css";
import { showDeleteConfirm } from "../../../confirm/DeleteConfirm";
const { Content, Sider } = Layout;

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
const QUESTION_LABELS = ["A", "B", "C", "D"];

const DetailQuiz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const quiz = useSelector(selectQuiz);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchQuiz(params.id));
  }, [dispatch, params]);

  return (
    <MainLayout>
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0, width: "332px" }}
            >
              <div className="quiz-img">
                <Image
                  style={{
                    width: "332px",
                    height: "218px",
                  }}
                  src={
                    quiz.coverImage === ""
                      ? "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
                      : quiz.coverImage
                  }
                />
                <div className="title">
                  <h2>Tên: {quiz.name}</h2>
                </div>
                <div className="number-play">
                  <div className="content">
                    <h4>{quiz.reports?.length} lượt</h4>
                  </div>
                  <div className="button-icon">
                    <div>
                      <Link
                        to={`/quiz/update/${quiz._id}`}
                        style={{ color: "black", fontSize: "14px" }}
                      >
                        <FaPencilAlt />
                      </Link>
                    </div>
                    <div>
                      <Space size="middle">
                        <DeleteOutlined
                          style={{ cursor: "pointer", color: "black" }}
                          onClick={() => {
                            showDeleteConfirm(quiz.name, async () => {
                              await dispatch(remove(quiz._id));
                              await dispatch(fetchQuiz());
                              await navigate("/quiz");
                            });
                          }}
                        />
                      </Space>
                    </div>
                    <div>
                      <FaEllipsisV />
                    </div>
                  </div>
                </div>
                <div className="button">
                  <div className="button1">
                    <Button
                      className="button-start"
                      style={{ backgroundColor: "#416CDA" }}
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
                <div className="description">
                  <h5>
                    Mô tả: <span>{quiz.description}</span>
                  </h5>
                </div>
                <div className="user">
                  <div>
                    <FaUserAlt />
                  </div>
                  <div className="user-content">{user.email}</div>
                </div>
              </div>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px", paddingLeft: "150px" }}>
            <div className="question">
              <h3>
                Câu hỏi <span>({quiz.questions?.length})</span>
              </h3>
            </div>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 1000,
              }}
            >
              {(quiz.questions || []).map((qt, i) => (
                <div className="quizquestion" key={qt.id}>
                  <div className="quizzquestion-top">
                    <div className="quizquestion-left">
                      <h4>{i + 1}-Câu hỏi</h4>
                      <h5>{qt.question}</h5>
                    </div>
                    <div className="quizquestion-right">
                      <Image
                        style={{
                          width: "234px",
                          height: "119px",
                          paddingTop: "5px",
                          borderRadius: "15px",
                          marginRight: "20px",
                          display: "block",
                        }}
                        src={
                          qt.image === ""
                            ? "https://tintuckhanhhoa.com/uploads/no_image_available.jpg"
                            : qt.image
                        }
                      ></Image>
                      <Button
                        style={{
                          position: "absolute",
                          backgroundColor: "#151414",
                          color: "#fff",
                          borderRadius: "5px",
                          opacity: "70%",
                          border: 0,
                          marginTop: "85px",
                          marginLeft: "-80px",
                        }}
                      >
                        20s
                      </Button>
                    </div>
                  </div>
                  <div className="quizzquestion-bottom">
                    {(qt.answers || []).map((as, index) => (
                      <div className="answer" key={index}>
                        <div className="answer-question">
                          <div className="answer-question-left">
                            <h3>{QUESTION_LABELS[index]}</h3>
                          </div>
                          <div className="answer-question-right">
                            <h4>{as.answer}</h4>
                          </div>
                        </div>
                        <div className="answer-icon">
                          {qt.correctAnswer === as.index
                            ? CorrectIcon
                            : IncorretIcocn}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </MainLayout>
  );
};

export default DetailQuiz;
