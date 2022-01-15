import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzes, selectQuizList, selectLoading } from "../quizSlice";
import { Skeleton, Card } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "../../../layouts/main.layout";

import "./styles.css";

const Quizzes = ({ socket }) => {
  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="quizzes">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="list-quiz">
            {quizzes.map((quiz) => (
              <Link to={`/quiz/detail/${quiz._id}`}>
                <Card
                  title={quiz.name}
                  extra={
                    <Link to={`/quiz/start/${quiz.id}`}>Bắt đầu game</Link>
                  }
                  style={{ width: "100%", marginBottom: "15px" }}
                >
                  <p>8 câu hỏi</p>
                  <p>Ngày tạo: 20/01/2022 08:35</p>
                  <p>3 lượt chơi</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
        <br />
      </div>
    </MainLayout>
  );
};

export default Quizzes;
