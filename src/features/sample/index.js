
import React from "react";
import { Col, Input, Row, Skeleton } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";
import {FaListUl,FaAngleDown,FaCaretRight,FaAppleAlt,FaPencilAlt,FaTrash,FaChartBar} from "react-icons/fa"

import "./styles.scss";

const ListQuizz = ({ socket }) => {
  return (
    <MainLayout>
      <br></br>
      <div className="listquiz">
        <Row>
          <Col span={16} offset={4}>
            <div className="search">
              <Input size="large" placeholder="Search" />
            </div>
            <br></br>
            <div className="header">
              <Row justify="space-between">
                <Col span={4}>
                  <FaListUl/>
                  <span id="span1" >3 Quiz</span>
                </Col>
                <Col span={4}>
                  <button  id="filter" type="" className="btn">
                    <FaAngleDown/> Mới nhất trước 
                  </button>
                </Col>
              </Row>
            </div>
            <br></br>
            <div className="quiz">
              <Row>
                <Col>
                  <h2>
                    Poly quiz! for formative assessment formative assessment
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col id="fa">
                  <FaCaretRight/>  <span>10 lần chơi</span>
                </Col>
                <Col id="fa"> 
                <FaListUl/>    <span>  3 câu hỏi</span>
                </Col>
              </Row>
              <Row className="quiz-button">
                <Col>
                  <button type="button" className="starr"> <FaAppleAlt/> Bắt đầu kiểm tra</button>
                </Col>
                <Col green-8>
                  <button type="button" className="edit"> <FaPencilAlt/> Chỉnh sửa</button>
                </Col>
                <Col green-8>
                  <button type="button" className="delete"> <FaTrash/> Xóa</button>
                </Col>
                <Col green-8>
                  <button type="button" className="report"> <FaChartBar/> Báo cáo</button>
                </Col>
              </Row>
              <br></br>
            </div>
            <br></br>
            <div className="quiz">
              <Row>
                <Col>
                  <h2>
                    Poly quiz! for formative assessment formative assessment
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col id="fa">
                  <FaCaretRight/>  <span>10 lần chơi</span>
                </Col>
                <Col id="fa"> 
                <FaListUl/>    <span>  3 câu hỏi</span>
                </Col>
              </Row>
              <Row className="quiz-button">
                <Col>
                  <button type="button" className="starr"> <FaAppleAlt/> Bắt đầu kiểm tra</button>
                </Col>
                <Col green-8>
                  <button type="button" className="edit"> <FaPencilAlt/> Chỉnh sửa</button>
                </Col>
                <Col green-8>
                  <button type="button" className="delete"> <FaTrash/> Xóa</button>
                </Col>
                <Col green-8>
                  <button type="button" className="report"> <FaChartBar/> Báo cáo</button>
                </Col>
              </Row>
              <br></br>
            </div>
            <br></br>
            <div className="quiz">
              <Row>
                <Col>
                  <h2>
                    Poly quiz! for formative assessment formative assessment
                  </h2>
                </Col>
              </Row>
              <Row>
                <Col id="fa">
                  <FaCaretRight/>  <span>10 lần chơi</span>
                </Col>
                <Col id="fa"> 
                <FaListUl/>    <span>  3 câu hỏi</span>
                </Col>
              </Row>
              <Row className="quiz-button">
                <Col>
                  <button type="button" className="starr"> <FaAppleAlt/> Bắt đầu kiểm tra</button>
                </Col>
                <Col green-8>
                  <button type="button" className="edit"> <FaPencilAlt/> Chỉnh sửa</button>
                </Col>
                <Col green-8>
                  <button type="button" className="delete"> <FaTrash/> Xóa</button>
                </Col>
                <Col green-8>
                  <button type="button" className="report"> <FaChartBar/> Báo cáo</button>
                </Col>
              </Row>
              <br></br>
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ListQuizz;
