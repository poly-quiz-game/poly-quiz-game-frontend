import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzes, selectQuizList, selectLoading } from "../quizSlice";
import { Skeleton, Card, Button } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.scss";

const Quizzes = () => {
  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="quizzes">
        <div className="quizzes-header">
          <Link to="create">
            <Button type="primary">Tạo quiz</Button>
          </Link>
        </div>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="list-quiz">
            {quizzes.map((quiz) => (
              <Card
                key={quiz._id}
                title={quiz.name}
                hoverable
                extra={<Link to={`/host/start/${quiz._id}`}>Bắt đầu game</Link>}
                actions={[
                  <Link key="detail" to={`/quiz/detail/${quiz._id}`}>
                    <span>Chi tiết</span>
                  </Link>,
                  <Link key="update" to={`/quiz/update/${quiz._id}`}>
                    <span>Sửa</span>
                  </Link>,
                ]}
                style={{ marginBottom: "15px" }}
              >
                <p>8 câu hỏi</p>
                <p>Ngày tạo: 20/01/2022 08:35</p>
                <span>3 lượt chơi</span>
              </Card>
            ))}
          </div>
        )}
        <br />
      </div>
    </MainLayout>
  );
};

export default Quizzes;
