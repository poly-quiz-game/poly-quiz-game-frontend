import React from "react";
import { Menu, Row, Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "Câu hỏi",
    dataIndex: "question",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Loại",
    dataIndex: "type",
  },
  // {
  //   title: "Đúng/Sai",
  //   dataIndex: "correct",
  // },
];

const Question = ({ report }) => {
  return (
    <div>
      {/* <Row>
        <Menu>
          <Menu.Item>
            <Link to="">Tất cả (5)</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Câu hỏi khó (2)</Link>
          </Menu.Item>
        </Menu>
      </Row> */}
      <Table columns={columns} dataSource={report.reportQuestions} />
    </div>
  );
};

export default Question;
