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
    sortDirection: "desc",
    sortField: "createdAt",
  });

  const [loadingState, setLoadingState] = useState({
    initLoading: true,
    loading: false,
  });

  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const total = useSelector(selectQuizTotal);

  const fetchData = () => {
    if (!loadingState.initLoading) {
      setLoadingState({ ...loadingState, loading: true });
    }
    dispatch(fetchQuizzes(metadata)).then(() => {
      setLoadingState({ initLoading: false, loading: false });
    });
  };

  useEffect(() => {
    if (
      ref?.current?.sortBy !== metadata.sortBy ||
      ref?.current?.search !== metadata.search
    ) {
      dispatch(quizActions.resetQuizzes()); // reset quizzes
    }
    fetchData();
    ref.current = metadata;
  }, [dispatch, metadata]);

  const { initLoading, loading } = loadingState;

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
              value={metadata.sortDirection}
              onChange={(value) =>
                setMetadata({
                  ...metadata,
                  offset: 0,
                  sortDirection: value,
                })
              }
            >
              <Select.Option value="desc">Mới nhất</Select.Option>
              <Select.Option value="asc">Cũ nhất</Select.Option>
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
            endMessage={
              !loading && !initLoading && <Divider plain>Hết</Divider>
            }
            scrollableTarget="quizzesDiv"
          >
            <List
              dataSource={quizzes}
              renderItem={(quiz) => (
                <Link
                  to={`/quiz/detail/${quiz.id}`}
                  key={quiz.id}
                  className="quiz-item-link"
                >
                  <div className="quiz-item" key={quiz.id}>
                    <Skeleton title={false} loading={quiz.loading} active>
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
                          <Link to={`/host/start/${quiz.id}`}>Bắt đầu</Link>
                        </Button>
                      </div>
                    </Skeleton>
                  </div>
                </Link>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
  );
};

export default Quizzes;
