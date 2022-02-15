import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Skeleton,
  Button,
  Card,
  List,
  Avatar,
  Layout,
  Menu,
  Breadcrumb,
  Image,
} from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import {
  FaUserAlt,
  FaCaretRight,
  FaEllipsisV,
  FaPencilAlt,
  FaStar,
  FaChartBar,
} from "react-icons/fa";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import MainLayout from "layouts/main.layout";
import { Link } from "react-router-dom";

import { fetchQuiz, selectQuiz, selectLoading } from "../quizSlice";

import "./detail.css";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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

const DetailQuiz = ({ socket }) => {
  let params = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector(selectQuiz);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuiz(params.id));
  }, [dispatch, params]);

  return (
    <MainLayout>
      {/* <div className="start-quiz">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <h2>{quiz.name}</h2>
            <div>
              <Button type="primary">Bắt đầu game</Button>
              <br />
              <br />
            </div>

            {(quiz.questions || []).map((qt) => (
              <Card
                key={qt._id}
                title={qt.question}
                size="small"
                style={{ marginBottom: "10px" }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={qt.answers}
                  renderItem={(answer, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          qt.correctAnswer === index
                            ? CorrectIcon
                            : IncorretIcocn
                        }
                        title={<a href="https://ant.design">{answer}</a>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            ))}
          </>
        )}
      </div> */}
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
                    paddingTop: "20px",
                  }}
                  src="https://dean2020.edu.vn/wp-content/uploads/2020/03/anh-cho-con.jpg"
                />
                 <div className="title">
                <h2>Tên Quizz: {quiz.name}</h2>
              </div>
              <div className="number-play">
                <div className="content">
                  <h4>1 lượt - 1 người chơi</h4>
                </div>
                <div className="button-icon">
                  <div>
                    <FaPencilAlt />
                  </div>
                  <div>
                    <FaStar />
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
                    <h3>Bắt đầu</h3>
                  </Button>
                </div>
              </div>
              <div className="description">
                <h5>
                  Mô tả: <span>ccc</span>
                </h5>
              </div>
              <div className="user">
                <div>
                  <FaUserAlt />
                </div>
                <div className="user-content">huyhtph07087@fpt.edu.vn</div>
              </div>
              </div>
             
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px", paddingLeft: "150px" }}>
            <div className="question">
              <h3>
                Câu hỏi <span>(3)</span>
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
              {(quiz.questions || []).map((qt) => (<div className="quizquestion">
                <div className="quizzquestion-top">
                  <div className="quizquestion-left">
                    <h4>1-Câu hỏi</h4>
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
                      src="https://dean2020.edu.vn/wp-content/uploads/2020/03/anh-cho-con.jpg"
                    ></Image>
                    <Button
                    style={{
                      position: "absolute",
                      backgroundColor: "#151414",
                      color: "#fff",
                      borderRadius: "5px",
                      opacity: "70%",
                      border: 0,
                      marginTop: '85px',
                      marginLeft: '-80px'
                    }}
                  >
                    20s
                  </Button>
                  </div>
                </div>
               
                <div className="quizzquestion-bottom">
                {(qt.answers || []).map((as) => (
                  <div className="answer">
                  <div className="answer-question">
                    <div className="answer-question-left">
                      <h3>A</h3>
                    </div>
                    <div className="answer-question-right">
                      <h4>{as}</h4>
                    </div>
                  </div>
                  <div className="answer-icon"><CheckCircleFilled/></div>
                </div>
                ))}
                  
                  {/* <div className="answer">
                    <div className="answer-question">
                      <div className="answer-question-left">
                        <h3>B</h3>
                      </div>
                      <div className="answer-question-right">
                        <h4>Con Mèo</h4>
                      </div>
                    </div>
                    <div className="answer-icon"><CloseCircleFilled/></div>
                  </div>
                  <div className="answer">
                    <div className="answer-question">
                      <div className="answer-question-left">
                        <h3>C</h3>
                      </div>
                      <div className="answer-question-right">
                        <h4>Con Lợn</h4>
                      </div>
                    </div>
                    <div className="answer-icon"><CloseCircleFilled/></div>
                  </div>
                  <div className="answer">
                    <div className="answer-question">
                      <div className="answer-question-left">
                        <h3>D</h3>
                      </div>
                      <div className="answer-question-right">
                        <h4>Con Gà</h4>
                      </div>
                    </div>
                    <div className="answer-icon"><CloseCircleFilled/></div>
                  </div> */}
                </div>
              </div>))}
              
              
              
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </MainLayout>
  );
};

export default DetailQuiz;
