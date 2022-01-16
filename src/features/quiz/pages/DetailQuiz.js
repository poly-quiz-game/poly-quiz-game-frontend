import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton, Button, Card, List, Avatar } from "antd";

import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import MainLayout from "layouts/main.layout";
import { Link } from "react-router-dom";

import { fetchQuiz, selectQuiz, selectLoading } from "../quizSlice";

import "./styles.css";

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
      <div className="start-quiz">
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
      </div>
    </MainLayout>
  );
};

export default DetailQuiz;
