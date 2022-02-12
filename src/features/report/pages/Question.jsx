import React from "react";
import { Menu, Row, Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "Question",
    dataIndex: "question",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Correct/incorrect",
    dataIndex: "correct",
  },
];
const data = [
  {
    key: "1",
    question: "abc",
    type: "Quiz",
    correct: "25%",
  },
  {
    key: "2",
    question: "hhhhhhhhhh",
    type: "Quiz",
    correct: "20%",
  },
  {
    key: "3",
    question: "sssssssssss",
    type: "Quiz",
    correct: "50%",
  },
  {
    key: "4",
    question: "bbbbbbbb",
    type: "Quiz",
    correct: "65%",
  },
  {
    key: "5",
    question: "aaaaaaaaaaaaa",
    type: "Quiz",
    correct: "75%",
  },
];

const Question = () => {
  return (
    <div>
      <Row>
        <Menu>
          <Menu.Item>
            <Link to="">All (5)</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Difficult questions (2)</Link>
          </Menu.Item>
        </Menu>
      </Row>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Question;
