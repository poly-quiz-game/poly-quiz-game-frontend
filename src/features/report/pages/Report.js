import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

import { Skeleton, List, Space, Divider, Input, Select, Avatar } from "antd";
import {
  CalendarOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.scss";
import {
  selectReportList,
  selectReportTotal,
  fetchReports,
  reportActions,
} from "../reportSlice";

const LIMIT = 20;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Report = () => {
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

  const reports = useSelector(selectReportList);
  const total = useSelector(selectReportTotal);

  const fetchData = () => {
    if (!loadingState.initLoading) {
      setLoadingState({ ...loadingState, loading: true });
    }
    dispatch(fetchReports(metadata)).then(() => {
      setLoadingState({ initLoading: false, loading: false });
    });
  };

  useEffect(() => {
    if (
      ref?.current?.sortDirection !== metadata.sortDirection ||
      ref?.current?.search !== metadata.search
    ) {
      dispatch(reportActions.resetReports()); // reset quizzes
    }
    fetchData();
    ref.current = metadata;
  }, [dispatch, metadata]);

  const { initLoading, loading } = loadingState;

  return (
    <MainLayout>
      <div className="reports" id="reportsDiv">
        <div className="header">
          <div className="title-top-list-quiz">
            <i className="fas fa-list"></i> {total} bản ghi
          </div>
          <div className="right-header">
            <div className="search">
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
            </div>

            <div className="report-sort">
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
        </div>
        <div className="list-report">
          <InfiniteScroll
            dataLength={reports.length}
            next={() =>
              setMetadata({
                ...metadata,
                offset: reports.length,
              })
            }
            hasMore={reports.length < total}
            endMessage={
              !loading && !initLoading && <Divider plain>Hết</Divider>
            }
            scrollableTarget="reportsDiv"
          >
            <List
              bordered
              dataSource={reports}
              renderItem={(report) => (
                <List.Item
                  key={report.id}
                  actions={
                    !report.loading
                      ? [
                          <div
                            className="report-players"
                            key="list-vertical-user-o"
                          >
                            <IconText
                              icon={UserOutlined}
                              text={report?.players?.length}
                            />
                          </div>,
                          <div
                            className="report-questions"
                            key="list-vertical-like-o"
                          >
                            <IconText
                              icon={QuestionCircleOutlined}
                              text={report?.reportQuestions?.length}
                            />
                          </div>,
                          <div
                            className="report-createdAt"
                            key="list-vertical-message"
                          >
                            <IconText
                              icon={CalendarOutlined}
                              text={moment(report.createdAt).format("DD-MM")}
                            />
                          </div>,
                        ]
                      : []
                  }
                >
                  <Skeleton
                    avatar
                    title={false}
                    loading={report.loading}
                    active
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={report?.quiz?.coverImage || "report.jpg"}
                        />
                      }
                      title={
                        <Link
                          to={`/report/detail/${report.id}`}
                          key={report.id}
                          className="quiz-item-link"
                        >
                          {report.name}{" "}
                        </Link>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
