import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Space, Button, Layout, Menu, Image, Collapse } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaUserAlt, FaEllipsisV, FaPencilAlt } from "react-icons/fa";
import { CheckCircleFilled, CloseCircleFilled,CaretRightOutlined,FieldTimeOutlined } from "@ant-design/icons";
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
const QUESTION_LABELS = ["A", "B", "C", "D"];

const DetailQuiz = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const quiz = useSelector(selectQuiz);
  const navigate = useNavigate();
  const test = quiz.questions;

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
                  <h2>
                    Tên:{" "}
                    {quiz.name?.length > 18
                      ? quiz.name.substring(0, 15) + "..."
                      : quiz.name}
                  </h2>
                </div>
                <div className="number-play">
                  <div className="content">
                    <h4>{quiz.reports?.length} lượt</h4>
                  </div>
                  <div className="button-icon">
                    <div>
                      <Link
                        to={`/quiz/update/${quiz.id}`}
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
                              await dispatch(remove(quiz.id));
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
            {(quiz.questions || []).map((qt, i) => (
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
            >
              <Panel
                header={questionTypeLabels[qt.type.name]}
                key="1"
                className="site-collapse-custom-panel"
              >
                <div className="quizzquestion-top">
                     <div className="quizquestion-left">
                       <h5>{qt.question?.length > 80 ? (qt.question.substring(0,75)+"...") : qt.question}</h5>
                       <div className="timeLimit"><FieldTimeOutlined style={{ fontSize: '32px',marginRight:"20px" }} />  Thời gian trả lời: {qt.timeLimit/1000} giây </div>
                     </div>
                     <div className="quizquestion-right">
                       <Image
                         style={{
                           width: "234px",
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
               {(qt.type.name == 'TRUE_FALSE_ANSWER') ? (qt.answers.slice(0, 2) || []).map((as, index) => (
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
                       {Number(qt.correctAnswer) === as.index
                        ? CorrectIcon
                         : IncorretIcocn}
                     </div>
                   </div>
                 )) : (qt.type.name == 'SINGLE_CORRECT_ANSWER' || 'MULTIPLE_CORRECT_ANSWER') ? (qt.answers || []).map((as, index) => (
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
                     {(qt.type.name == 'SINGLE_CORRECT_ANSWER') ? (Number(qt.correctAnswer) === as.index
                         ? CorrectIcon
                         : IncorretIcocn):"Huy"}
                     </div>
                   </div>
                 )) : (qt.answers.slice(0, 1) || []).map((as, index) => (
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
                    {Number(qt.correctAnswer) === as.index
                         ? CorrectIcon
                         : IncorretIcocn}
                     </div>
                   </div>
                ))}

               </div>
              </Panel>
            </Collapse>))}
            
          </Layout>
        </Layout>
      </Layout>
    </MainLayout>
  );
};

export default DetailQuiz;
