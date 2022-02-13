import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Input, Row, Select } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.scss";
import { selectReportList, selectLoading, fetchReports } from "../reportSlice";

const Report = () => {
  const dispatch = useDispatch();

  const reports = useSelector(selectReportList);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="report">
        <Row>
          <Col span={16} offset={4}>
            <div className="search">
              <Input size="large" placeholder="Search" />
            </div>
            <div className="header">
              <Row justify="space-between">
                <Col span={4}>
                  <span>
                    <i className="fas fa-list"></i> {reports.length} bản ghi
                  </span>
                </Col>
                <Col span={3}>
                  <Select style={{ width: "100%" }} value="latest">
                    <Select.Option value="latest">Mới nhất</Select.Option>
                    <Select.Option value="true_false">Cũ nhất</Select.Option>
                  </Select>
                </Col>
              </Row>
            </div>
            {reports.map((r) => (
              <div className="report-item" key={r._id}>
                <Row>
                  <Col>
                    <h2>{r.quiz.name}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>
                      <i className="far fa-user"></i> {r.players.length} người
                      chơi
                    </span>
                  </Col>
                  <Col>
                    <span className="question">
                      <i className="fas fa-list"></i> {r.quiz.questions.length}{" "}
                      câu hỏi
                    </span>
                  </Col>
                </Row>
                <Row className="quiz-button">
                  <Col>
                    <Button type="Button" className="excel">
                      <i className="far fa-file-excel"></i> Xuất file excel
                    </Button>
                  </Col>
                  <Col>
                    <Link to={`/report/detail/${r._id}`}>
                      <Button className="detail-btn">
                        <i className="fas fa-info-circle"></i> Chi tiết
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Report;
