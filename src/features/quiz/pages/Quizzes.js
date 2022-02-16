import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { Skeleton, Card, Button, Pagination, Input, Image } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import {
  fetchQuizzes,
  selectQuizList,
  selectLoading,
  selectQuizTotal,
} from "../quizSlice";

import "./styles.scss";

const LIMIT = 2;

const Quizzes = () => {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);
  const total = useSelector(selectQuizTotal);

  useEffect(() => {
    dispatch(fetchQuizzes({ search, offset, limit: LIMIT }));
  }, [dispatch, offset, search]);

  const current = offset / LIMIT + 1;

  return (
    <MainLayout>
      <div className="quizzes">
        <div className="quizzes-header">
          <Link to="create">
            <Button type="primary">Tạo quiz</Button>
          </Link>
        </div>
        <div className="search">
          <Input
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="list-quiz">
          {loading ? (
            <Skeleton />
          ) : (
            quizzes.map((quiz) => (
              <Card
                className="quiz-item"
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
                <p>{quiz.questions.length} câu hỏi</p>
                <p>
                  Ngày tạo: {moment(quiz.updatedAt).format("DD/MM/YYYY HH:mm")}
                </p>
                <span>{quiz?.reports?.length || 0} lượt chơi</span>
                <Image
                  className="cover-image"
                  src={quiz.coverImage}
                  width="200px"
                />
              </Card>
            ))
          )}
          <Pagination
            defaultCurrent={1}
            pageSize={LIMIT}
            current={current}
            total={total}
            onChange={(val) => setOffset((val - 1) * LIMIT)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Quizzes;
