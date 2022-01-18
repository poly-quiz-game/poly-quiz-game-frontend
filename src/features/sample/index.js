import React from "react";
import { Col, Input, Row, Skeleton,Button} from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";
import {
  FaListUl,
  FaAngleDown,
  FaCaretRight,
  FaAppleAlt,
  FaPencilAlt,
  FaTrash,
  FaChartBar,
} from "react-icons/fa";

import "./styles.scss";
const initialQuizz = [
  {
    title: "Quiz 1",
    time: 4,
    question: 7,
  },
  {
    title: "Quiz 2",
    time: 5,
    question: 15,
  },
  {
    title: "Quiz 3",
    time: 6,
    question: 4,
  },
  {
    title: "Quiz 4",
    time: 12,
    question: 3,
  },
  {
    title: "Quiz 5",
    time: 17,
    question: 2,
  },
];
const state = {
  questions: initialQuizz,
};
const ListQuizz = () => {
  const [titles, setTitles] = React.useState(initialQuizz);
  const deleteQuiz = (index) => {
    // Nếu chỉ còn lại 1 câu hỏi thì ko làm gì
    if (titles.length === 1) return;
    // Lọc ra các câu hỏi không có index trùng với index cần xoá, (index - thứ thự trong array)
    const NewQuizz = titles.filter((qt, i) => index !== i);
    setTitles(NewQuizz);
  };
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
                  <FaListUl />
                  <span id="span1">{titles.length} Quiz</span>
                </Col>
                <Col span={4}>
                  <button id="filter" type="" className="btn">
                    <FaAngleDown /> Mới nhất trước
                  </button>
                </Col>
              </Row>
            </div>
            <br></br>
            {titles.map((tt, index) => (
              <div className="quiz" key={index}>
                <Row>
                  <Col>
                    <h2>{tt.title}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col id="fa">
                    <FaCaretRight /> <span>{tt.time} lần chơi</span>
                  </Col>
                  <Col id="fa">
                    <FaListUl /> <span> {tt.question} câu hỏi</span>
                  </Col>
                </Row>
                <Row className="quiz-button">
                  <Col>
                  <Button id="starr"> {" "}
                      <FaAppleAlt /> <span id="starttext"> Bắt đầu kiểm tra</span></Button>
                  </Col>
                  <Col green-8>
                    <Button id="edit">
                    {" "}
                      <FaPencilAlt /><span id="starttext"> Chỉnh sửa</span> 
                    </Button>
                  </Col>
                  <Col green-8>
                  <Button id="delete" onClick={() => deleteQuiz(index)}>
                  {" "}
                      <FaTrash /><span id="starttext"> Xóa</span> 
                    </Button>
                  </Col>
                  <Col green-8>
                  <Button id="report">
                  {" "}
                      <FaChartBar /> <span id="starttext"> Báo cáo</span>
                    </Button>
                  </Col>
                </Row>
                <br></br>
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ListQuizz;
