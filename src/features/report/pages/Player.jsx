import React from "react";
import { Menu, Row, Table } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  // {
  //   title: "Rank",
  //   dataIndex: "rank",
  // },
  // {
  //   title: "Correct answers",
  //   dataIndex: "correct",
  // },
  // {
  //   title: "Unanswered",
  //   dataIndex: "unanswered",
  // },
  {
    title: "Điểm",
    dataIndex: "score",
  },
];

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

const Player = ({ report }) => {
  return (
    <div>
      {/* <Row>
        <Menu>
          <Menu.Item>
            <Link to="">Tất cả ({report?.players?.length})</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Chưa hoàn thành</Link>
          </Menu.Item>
        </Menu>
      </Row> */}
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={report?.players}
      />
    </div>
  );
};

export default Player;
