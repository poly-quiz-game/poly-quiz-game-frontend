import React from "react";
import { Menu, Row, Table } from "antd";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "nickName",
    dataIndex: "name",
    // render: (text) => <a>{text}</a>,
  },
  {
    title: "Rank",
    dataIndex: "rank",
  },
  {
    title: "Correct answers",
    dataIndex: "correct",
  },
  {
    title: "Unanswered",
    dataIndex: "unanswered",
  },
  {
    title: "Final score",
    dataIndex: "score",
  },
];
const data = [
  {
    key: "1",
    name: "Đoàn",
    rank: 1,
    correct: "25%",
    unanswered: 0,
    score: 8,
  },
  {
    key: "2",
    name: "Huy",
    rank: 2,
    correct: "25%",
    unanswered: 0,
    score: 8,
  },
  {
    key: "3",
    name: "Tiến",
    rank: 3,
    correct: "25%",
    unanswered: 0,
    score: 7.5,
  },
  {
    key: "4",
    name: "Khiêm",
    rank: 4,
    correct: "25%",
    unanswered: 0,
    score: 7,
  },
  {
    key: "5",
    name: "Hiếu",
    rank: 5,
    correct: "25%",
    unanswered: 0,
    score: 6,
  },
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const Player = () => {
  return (
    <div>
      <Row>
        <Menu>
          <Menu.Item>
            <Link to="">All (5)</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Need help (5)</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Didn’t finish (2)</Link>
          </Menu.Item>
        </Menu>
      </Row>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default Player;
