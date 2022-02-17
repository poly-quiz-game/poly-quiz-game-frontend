import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Input, Row, Select } from "antd";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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
      <div className="list-report">
        <div className="header">
          <div justify="space-between" style={{ display: "flex" }}>
            <div className="title-top-list-quiz">
              <span>
                <i className="fas fa-list"></i> {reports.length} bản ghi
              </span>
            </div>
            <div className="search">
              <Input
                size="large"
                placeholder="Search"
                style={{ width: "400px" }}
              />
            </div>

            <div className="title-top-list-quizz">
              <Select value="latest">
                <Select.Option value="latest">Mới nhất</Select.Option>
                <Select.Option value="true_false">Cũ nhất</Select.Option>
              </Select>
            </div>
          </div>
        </div>
        {reports.map((r) => (
          <div className="report-item" key={r._id}>
            <Row>
              <img width={150} height={130} src="quiz.jpg" />
              <Row style={{ marginLeft: "20px" }}>
                <Col>
                  <h2>{r.quiz.name}</h2>
                </Col>
              </Row>
              <div className="nav-list-quiz-one">
                <Row className="quiz">
                  <div>
                    <span>
                      <i className="far fa-user"></i> {r.players.length} người
                      chơi
                    </span>
                  </div>
                  <div>
                    <span className="question">
                      <i className="fas fa-list"></i> {r.quiz.questions.length}{" "}
                      câu hỏi
                    </span>
                  </div>
                </Row>
                <Row className="quiz-deltai">
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
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Report;
