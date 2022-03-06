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
  selectLoading,
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
    sortBy: "-createdAt",
  });

  const dispatch = useDispatch();

  const reports = useSelector(selectReportList);
  const loading = useSelector(selectLoading);
  const total = useSelector(selectReportTotal);

  useEffect(() => {
    if (
      ref?.current?.sortBy !== metadata.sortBy ||
      ref?.current?.search !== metadata.search
    ) {
      dispatch(reportActions.resetReports()); // reset quizzes
    }
    console.log("metadata", metadata);
    dispatch(fetchReports(metadata));
    ref.current = metadata;
  }, [dispatch, metadata]);

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
            loader={<Skeleton paragraph={{ rows: 1 }} active />}
            endMessage={!loading && <Divider plain>Hết</Divider>}
            scrollableTarget="reportsDiv"
          >
            <List
              bordered
              dataSource={
                reports.length ? reports : []
              }
              renderItem={(report) =>
                loading ? (
                  <List.Item>
                    <Skeleton avatar paragraph={{ rows: 1 }} />
                  </List.Item>
                ) : (
                  <List.Item
                    key={report.id}
                    actions={[
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
                          text={report?.questions?.length}
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
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={report?.quiz?.coverImage || "report.jpg"}
                        />
                      }
                      title={
                        <Link
                          to={`/report/detail/${report._id}/players`}
                          key={report._id}
                          className="quiz-item-link"
                        >
                          {report.name}{" "}
                        </Link>
                      }
                    />
                  </List.Item>
                )
              }
            />
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
