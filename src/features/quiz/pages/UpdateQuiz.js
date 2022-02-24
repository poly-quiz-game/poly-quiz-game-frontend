import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Button, Card, List } from "antd";
import { Layout, Menu } from "antd";

import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import { fetchQuiz, selectQuiz } from "../quizSlice";

const { Content, Sider } = Layout;

import "./styles.scss";

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

const UpdateQuiz = ({ socket }) => {
  let params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quiz = useSelector(selectQuiz);
  // const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuiz(params.id));
  }, [dispatch, params]);

  return (
    <Layout>
      <Sider width={300} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          {(quiz.questions || []).map((qt, index) => (
            <Card
              hoverable
              title={`${index + 1}. Quiz`}
              style={{ width: "calc(100% - 20px)", margin: "10px auto" }}
              key={qt._id}
              size="small"
            >
              {qt.question}
            </Card>
          ))}
        </Menu>
      </Sider>
      <Content style={{ padding: "24px" }}>
        <div className="start-quiz">
          <>
            <Button type="default" onClick={() => navigate(-1)}>
              Trở về
            </Button>
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
        </div>
      </Content>
    </Layout>
  );
};

export default UpdateQuiz;
