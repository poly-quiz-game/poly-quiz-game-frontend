import React from "react";
import { Col, Input, Row, Skeleton } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.css";

const Report = ({ socket }) => {
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
                  <span><i className="fas fa-list"></i> 3 bản ghi</span>
                </Col>
                <Col span={4}>
                  <button type="" className="btn btn-new">
                  <i className="fas fa-chevron-down"></i> Mới nhất
                  </button>
                </Col>
              </Row>
            </div>
            <div className="quiz">
              <Row>
                <Col>
                  <h2>
                    Poly quiz! for formative assessment formative assessment
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span><i className="far fa-user"></i> 10 người chơi</span>
                </Col>
                <Col>
                  <span className="question"><i className="fas fa-list"></i> 3 câu hỏi</span>
                </Col>
              </Row>
              <Row className="quiz-button">
                <Col>
                  <button type="button" className="excel">
                    <i className="far fa-file-excel"></i>    Xuất file excel
                  </button>
                </Col>
                <Col>
                  <Link to="detail/3"><i className="fas fa-info-circle"></i> Chi tiết</Link>
                </Col>
              </Row>
            </div>
            <div className="quiz">
              <Row>
                <Col>
                  <h2>
                    Poly quiz! for formative assessment formative assessment
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span><i className="far fa-user"></i> 10 người chơi</span>
                </Col>
                <Col>
                  <span className="question"><i className="fas fa-list"></i> 3 câu hỏi</span>
                </Col>
              </Row>
              <Row className="quiz-button">
                <Col>
                  <button type="button" className="excel">
                    <i className="far fa-file-excel"></i>    Xuất file excel
                  </button>
                </Col>
                <Col green-8>
                  <button type="button" className="detail">
                  <i className="fas fa-info-circle"></i> Chi tiết
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Report;
