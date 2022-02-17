import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { Skeleton, Card, Button, Pagination, Input, Image, Select } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import {
  fetchQuizzes,
  selectQuizList,
  selectLoading,
  selectQuizTotal,
} from "../quizSlice";

import "./styles.scss";

const LIMIT = 5;

const Quizzes = () => {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt");

  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);
  const total = useSelector(selectQuizTotal);

  useEffect(() => {
    dispatch(fetchQuizzes({ search, sortBy, offset, limit: LIMIT }));
  }, [dispatch, offset, search, sortBy]);

  const current = offset / LIMIT + 1;

  return (
    <MainLayout>
      <div className="quizzes">
        <div className="quizzes-header">
          <div className="quizzes-search">
            <Input
              placeholder="Tìm kiếm"
              value={search}
              size="large"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="create">
              <Button type="primary" size="large">
                Tạo quiz
              </Button>
            </Link>
          </div>
          <div className="quizzes-sort">
            <Select value={sortBy} onChange={setSortBy} size="large">
              <Select.Option value="-createdAt">Mới nhất</Select.Option>
              <Select.Option value="+createdAt">Cũ nhất</Select.Option>
            </Select>
          </div>
        </div>
        <div className="list-quiz">
          {loading ? (
            <Skeleton />
          ) : (
            quizzes.map((quiz) => (
              <Link
                to={`/detail/${quiz._id}`}
                key={quiz._id}
                className="quiz-item-link"
              >
                <div className="quiz-item" key={quiz._id}>
                  <div className="quiz-item-image">
                    <img src={quiz.coverImage || "quiz.png"} />
                  </div>
                  <div className="quiz-item-content">
                    <h2 className="quiz-item-name">{quiz.name}</h2>
                    <div className="quiz-item-info">
                      <div>
                        <i className="fas fa-play"></i> {quiz?.reports?.length}{" "}
                        lượt chơi
                      </div>
                      <div>
                        <i className="fas fa-question"></i>
                        {quiz?.questions?.length} câu hỏi
                      </div>
                      <div>
                        <i className="fas fa-calendar-check"></i>{" "}
                        {moment(quiz.createdAt).format("DD/MM/YYYY - HH:mm")}
                      </div>
                    </div>
                  </div>
                  <div className="quiz-item-actions">
                    <Button>
                      <Link to={`/host/start/${quiz._id}`}>Bắt đầu</Link>
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          )}
          <Pagination
            hideOnSinglePage
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
