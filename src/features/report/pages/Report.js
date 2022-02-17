import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Input, Row, Select } from "antd";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.scss";
import {
  selectReportList,
  selectReportTotal,
  selectLoading,
  fetchReports,
} from "../reportSlice";

const LIMIT = 2;

const Report = () => {
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState("-createdAt");
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const reports = useSelector(selectReportList);
  const total = useSelector(selectReportTotal);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchReports({ sortBy, search, offset, limit: LIMIT }));
  }, [dispatch, sortBy, search]);

  const current = offset / LIMIT + 1;

  return (
    <MainLayout>
      <div className="list-report">
        <div className="header">
          <div className="title-top-list-quiz">
            <i className="fas fa-list"></i> {total} bản ghi
          </div>
          <div className="right-header">
            <div className="search">
              <Input
                size="large"
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="report-sort">
              <Select value={sortBy} onChange={setSortBy} size="large">
                <Select.Option value="-createdAt">Mới nhất</Select.Option>
                <Select.Option value="+createdAt">Cũ nhất</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        {reports.map((r) => (
          <div className="report-item" key={r._id}>
            <Row>
              <img
                width={150}
                height={130}
                src={r.quiz.coverImage || "quiz.jpg"}
              />
              <Row style={{ marginLeft: "20px" }}>
                <Col>
                  <h2>{r.quiz.name}</h2>
                </Col>
              </Row>
              <div className="nav-list-quiz-one">
                <Row className="quiz">
                  <div>
                    <span>
                      <i className="fas fa-user"></i> {r?.players?.length} nguời
                      tham gia
                    </span>
                  </div>
                  <div>
                    <span className="question">
                      <i className="fas fa-question"></i> {r?.questions?.length}{" "}
                      câu hỏi
                    </span>
                  </div>
                  <div>
                    <span className="question">
                      <i className="fas fa-calendar-check"></i>{" "}
                      {moment(r.createdAt).format("DD/MM/YYYY - HH:mm")}
                    </span>
                  </div>
                </Row>
                <Row className="quiz-detail">
                  <div>
                    <Button type="Button" className="excel">
                      <i className="far fa-file-excel"></i> Xuất file excel
                    </Button>
                  </div>
                  <div>
                    <Link to={`/report/detail/${r._id}`}>
                      <Button className="detail-btn">
                        <i className="fas fa-info-circle"></i> Chi tiết
                      </Button>
                    </Link>
                  </div>
                </Row>
              </div>
            </Row>
          </div>
        ))}
        <div className="nextPage">
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

export default Report;
