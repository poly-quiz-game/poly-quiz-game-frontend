import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Skeleton, Card, Button, Pagination, Input } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import {
  fetchQuizzes,
  selectQuizList,
  selectLoading,
  selectQuizTotal,
} from "../quizSlice";

import "./styles.scss";

const LIMIT = 10;

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
            <Pagination
              defaultCurrent={1}
              pageSize={LIMIT}
              current={current}
              total={total}
              onChange={(val) => setOffset((val - 1) * LIMIT)}
            />
          </div>
        )}
        <br />
      </div>
    </MainLayout>
  );
};

export default Quizzes;
