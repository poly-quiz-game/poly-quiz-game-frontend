import { Line, Pie } from "@ant-design/plots";
import { Button, Card, Col, Row, Typography } from "antd";
import { logout } from "features/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layouts/main.layout";
import { selectUser } from "../auth/authSlice";
import "./style.scss";
import moment from "moment";
import { fetchCount, profile, selectUserCount, selectUserProfile } from "./userProfileSlice";

const { Title } = Typography;

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
            <UserPfofile />
          </Row>
          <Row gutter={16}>
            <ChartLine />
          </Row>
        </div>
      </div>
    </MainLayout>
  );
};

const UserPfofile = () => {
  const dispatch = useDispatch();
  const { countQuiz, user } = useSelector(selectUserProfile);
  let countQuestion = 0;
  let countPlayers = 0;

  user?.quizzes.forEach((element) => {
    countQuestion += element.questions.length;
    element.reports.forEach((element) => {
      countPlayers += element.players.length;
    });
  });

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  return (
    <>
      <Col span={8}>
        <Card>
          <h4>Tổng số quiz được tạo</h4>
          <Title>{countQuiz || 0}</Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <h4>Tổng số câu hỏi</h4>
          <Title>{countQuestion}</Title>
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <h4>Tổng số người tham gia</h4>
          <Title>{countPlayers}</Title>
        </Card>
      </Col>
    </>
  );
};

Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + days);
  return this;
};
function getDateArray(startDate, endDate, addFn, interval) {
  addFn = addFn || Date.prototype.addDays;
  interval = interval || 1;

  var retVal = [];
  var current = new Date(startDate);

  while (current <= new Date(endDate)) {
    retVal.push(moment(new Date(current)).format("YYYY-MM-DD"));
    current = addFn.call(current, interval);
  }

  return retVal;
}

const ChartLine = () => {
  const dispatch = useDispatch();
  const {quizzes, arrayCount} = useSelector(selectUserCount);
  const [metadata, setMetadata] = useState({
    start: moment(Date.now()).subtract(30, "days"),
    end: moment(Date.now()),
  });

  const countData = arrayCount?.reduce((a, v) => ({ ...a, [v.date]: v.count }), {}) || {};

  const data = getDateArray(metadata.start, metadata.end).map((date) => ({
    date,
    scales: countData[date] || 0,
  }));

  let MULTIPLE_CORRECT_ANSWER = 0 //2
  let TRUE_FALSE_ANSWER = 0 //3
  let TYPE_ANSWER = 0 //4
  let SINGLE_CORRECT_ANSWER = 0 //1

  quizzes?.forEach(item => {
    item.questions?.forEach(as => {
      if(as.questionTypeId == 1){
        SINGLE_CORRECT_ANSWER += 1
      }
      if(as.questionTypeId == 2){
        MULTIPLE_CORRECT_ANSWER += 1
      }
      if(as.questionTypeId == 3){
        TRUE_FALSE_ANSWER += 1
      }
      if(as.questionTypeId == 4){
        TYPE_ANSWER += 1
      }
    })
  })

  useEffect(() => {
    dispatch(fetchCount(metadata));
  }, [dispatch, metadata]);

  const data1 = [
    {
      type: "Một đáp án",
      value: SINGLE_CORRECT_ANSWER,
    },
    {
      type: "Nhiều đáp án",
      value: MULTIPLE_CORRECT_ANSWER,
    },
    {
      type: "Đúng sai",
      value: TRUE_FALSE_ANSWER,
    },
    {
      type: "Nhập câu trả lời",
      value: TYPE_ANSWER,
    },
  ];
  const config = {
    appendPadding: 10,
    data: data1,
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
  const configLine = {
    data,
    padding: "auto",
    xField: "date",
    yField: "scales",
    xAxis: {
      // type: 'timeCat',
      tickCount: 10,
    },
  };
  return (
    <>
      <Col span={8}>
        <Card>
          <Pie {...config} />
          <h2>Biểu đồ tỉ lệ % loại câu hỏi trong 30 ngày gần nhất</h2>
        </Card>
      </Col>
      <Col span={16}>
        <Card>
          <Line {...configLine} />
          <br />
          <h2>Biểu đồ tỉ lệ % chơi game trong 30 ngày gần nhất</h2>
        </Card>
      </Col>
    </>
  );
};

export default UserProfile;
