import React from "react";
import { useSelector } from "react-redux";
import { selectUser, logout } from "features/auth/authSlice";
import { Typography } from "antd";
const { Title } = Typography;
import { Pie, Line } from "@ant-design/plots";

import MainLayout from "../../layouts/main.layout";
const data = [
  {
    type: "Một đáp án",
    value: 27,
  },
  {
    type: "Nhiều đáp án",
    value: 25,
  },
  {
    type: "Đúng sai",
    value: 18,
  },
  {
    type: "Nhập câu trả lời",
    value: 15,
  },
];
const config = {
  appendPadding: 10,
  data,
  angleField: "value",
  colorField: "type",
  radius: 0.9,
  label: {
    type: "inner",
    offset: "-30%",
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: "center",
    },
  },
  interactions: [
    {
      type: "element-active",
    },
  ],
};

import "./style.scss";
import { Button, Card, Col, Row } from "antd";

const UserProfile = (props) => {
  const user = useSelector(selectUser);
  return (
    <MainLayout>
      <div className="profile">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user.picture} alt="avatar" />
          </div>
          <div>
            <h1>{user.name}</h1>
            <p className="email">{user.email}</p>
            <Button onClick={logout} danger>
              Đăng xuất
            </Button>
          </div>
        </div>
        <div className="profile-report">
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <h4>Tổng số quiz được tạo</h4>
                <Title>59</Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <h4>Tổng số câu hỏi</h4>
                <Title>123</Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <h4>Tổng số người tham gia</h4>
                <Title>31234</Title>
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <Pie {...config} />
              </Card>
            </Col>
            <Col span={14}>
              <Card>
                <DemoLine />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

const DemoLine = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  return <Line {...config} />;
};

export default UserProfile;
