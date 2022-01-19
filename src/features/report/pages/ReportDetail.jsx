import React from "react";
import { Col, Input, Menu, Row, Skeleton } from "antd";

import { Link, Outlet } from "react-router-dom";
import MainLayout from "layouts/main.layout";

const ReportDetail = () => {
  return (
    <MainLayout>
      <div className="conten">
        <Row>
          <Col span={20} offset={2}>
            <Row>
              <Col span={6}>
                <div>
                  <h5>Live</h5>
                  <h2>Name game 1</h2>
                  <p>January 15, 2022, 10:05 PM</p>
                </div>
              </Col>
              <Col span={6} offset={12}>
                <Row>
                  <div className="synthetic">
                    <div className="synthetic-div">
                      <i className="far fa-check-circle"></i>
                      <p>25 %</p>
                    </div>
                    <p>Chính xác</p>
                  </div>
                  <div className="synthetic">
                    <div className="synthetic-div">
                      <i className="far fa-question-circle"></i>
                      <p>25</p>
                    </div>
                    <p>Câu hỏi</p>
                  </div>
                  <div className="synthetic">
                    <div className="synthetic-div">
                      <i className="fas fa-user-plus"></i>
                      <p>10</p>
                    </div>
                    <p>Người tham gia</p>
                  </div>
                </Row>
              </Col>
            </Row>
            <Menu>
              <Menu.Item>
                <Link to="">Players</Link>
              </Menu.Item>
              <Menu.Item>
              <Link to="question">Questions</Link>
              </Menu.Item>
            </Menu>
            <hr />
            <div>
              <Outlet />
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ReportDetail;
