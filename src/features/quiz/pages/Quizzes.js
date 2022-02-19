import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  PlayCircleOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Skeleton, List, Button, Divider, Input, Select } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import {
  fetchQuizzes,
  selectQuizList,
  selectLoading,
  selectQuizTotal,
  quizActions,
} from "../quizSlice";

import "./styles.scss";

const LIMIT = 20;

const Quizzes = () => {
  const ref = useRef();

  const [metadata, setMetadata] = useState({
    offset: 0,
    limit: LIMIT,
    search: "",
    sortBy: "-createdAt",
  });

  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);
  const total = useSelector(selectQuizTotal);

  useEffect(() => {
    if (
      ref?.current?.sortBy !== metadata.sortBy ||
      ref?.current?.search !== metadata.search
    ) {
      dispatch(quizActions.resetQuizzes()); // reset quizzes
    }
    dispatch(fetchQuizzes(metadata));
    ref.current = metadata;
  }, [dispatch, metadata]);

  return (
    <MainLayout>
      <div className="quizzes" id="quizzesDiv">
        <div className="quizzes-header">
          <div className="quizzes-search">
            <Link to="create">
              <Button type="primary">Tạo mới</Button>
            </Link>
          </div>
          <div className="quizzes-search">
            <Input
              placeholder="Tìm kiếm"
              value={metadata.search}
              onChange={(e) =>
                setMetadata({
                  ...metadata,
                  search: e.target.value,
                })
              }
            />
            <Select
              value={metadata.sortBy}
              onChange={(value) =>
                setMetadata({
                  ...metadata,
                  offset: 0,
                  sortBy: value,
                })
              }
            >
              <Select.Option value="-createdAt">Mới nhất</Select.Option>
              <Select.Option value="+createdAt">Cũ nhất</Select.Option>
            </Select>
          </div>
        </div>
        <div className="list-quiz">
          <InfiniteScroll
            dataLength={quizzes.length}
            next={() =>
              setMetadata({
                ...metadata,
                offset: quizzes.length,
              })
            }
            hasMore={quizzes.length < total}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={!loading && <Divider plain>Hết</Divider>}
            scrollableTarget="quizzesDiv"
          >
            <List
              dataSource={
                quizzes.length ? quizzes : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              }
              renderItem={(quiz) =>
                loading ? (
                  <Skeleton avatar paragraph={{ rows: 1 }} />
                ) : (
                  <Link
                    to={`/quiz/detail/${quiz._id}`}
                    key={quiz._id}
                    className="quiz-item-link"
                  >
                    <div className="quiz-item" key={quiz._id}>
                      <div className="quiz-item-image">
                        <img src={quiz.coverImage || "quiz.png"} />
                      </div>
                      <div className="quiz-item-content">
                        <h3 className="quiz-item-name">{quiz.name}</h3>
                        <div className="quiz-item-info">
                          <div>
                            <PlayCircleOutlined /> {quiz?.reports?.length} lượt
                            chơi
                          </div>
                          <div>
                            <QuestionCircleOutlined /> {quiz?.questions?.length}{" "}
                            câu hỏi
                          </div>
                          <div>
                            <CalendarOutlined />{" "}
                            {moment(quiz.createdAt).format(
                              "DD/MM/YYYY - HH:mm"
                            )}
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
                )
              }
            />
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
  );
};

export default Quizzes;
