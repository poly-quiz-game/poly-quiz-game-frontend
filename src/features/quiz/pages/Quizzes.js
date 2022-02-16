import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu,Button, Col, Input, Row, Select,Skeleton, Card, Pagination  } from "antd";
import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import {
  fetchQuizzes,
  selectQuizList,
  selectLoading,
  selectQuizTotal,
} from "../quizSlice";

import "./styles.scss";
import { selectReportList, fetchReports } from "../../report/reportSlice";
const LIMIT = 2;

const Quizzes = () => {
  const reports = useSelector(selectReportList);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);
  const total = useSelector(selectQuizTotal);

  useEffect(() => {
    dispatch(fetchQuizzes({ search, offset, limit: LIMIT }));
  }, [dispatch, offset, search]);

  const current = offset / LIMIT + 1;

  return (
    <MainLayout>
      <div className="main-quiz-all">
        <Menu
          className="nav-list-quiz"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ width: "299px", paddingTop: "10px", color: "black" }}
        >
          <Menu.Item style={{ fontWeight: "700" }} key="1">
            <i className="fas fa-list" style={{ marginRight: "30px" }}></i>
            option1
          </Menu.Item>
          <Menu.Item style={{ fontWeight: "700" }} key="2">
            <i className="fas fa-list" style={{ marginRight: "30px" }}></i>
            option2
          </Menu.Item>
          <Menu.Item style={{ fontWeight: "700" }} key="3">
            <i className="fas fa-list" style={{ marginRight: "30px" }}></i>
            option3
          </Menu.Item>
          <Menu.Item style={{ fontWeight: "700" }} key="4">
            <i className="fas fa-list" style={{ marginRight: "30px" }}></i>
            option4
          </Menu.Item>
          <div className="border" style={{ display: "flex" }}>
            <img
              width={15}
              style={{ marginLeft: "10px" }}
              src="user-icon-2098873_960_720.png"
            />
            <h5 style={{ marginTop: "7px", marginLeft: "10px" }}>
              khiemmdph11477@fpt.edu.vn
            </h5>
          </div>
          <div className="button-nav-sumbit">Fpoly + AccessPass</div>
        </Menu>
        <div className="quizzes">
          <div className="quizzes-top-sreach">
            <div className="title-top-list-quiz">
              <span>
                <i className="fas fa-list"></i> {reports.length} bản ghi
              </span>
            </div>
            <div className="search">
              <Input
                placeholder="Tìm kiếm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="title-top-list-quizz">
              <Select value="latest">
                <Select.Option value="latest">Mới nhất</Select.Option>
                <Select.Option value="true_false">Cũ nhất</Select.Option>
              </Select>
            </div>
            <div className="quizzes-header">
              <Link to="create">
                <Button type="primary">Tạo quiz</Button>
              </Link>
            </div>
          </div>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="list-quiz">
              {quizzes.map((quiz) => (
                <Card
                  key={quiz._id}
                  title={quiz.name}
                  hoverable
                  extra={
                    <Link to={`/host/start/${quiz._id}`}>Bắt đầu game</Link>
                  }
                  actions={[
                    <Link key="detail" to={`/quiz/detail/${quiz._id}`}>
                      <span>Chi tiết</span>
                    </Link>,
                    <Link key="update" to={`/quiz/update/${quiz._id}`}>
                      <span>Sửa</span>
                    </Link>,
                  ]}
                  style={{ marginBottom: "15px" }}
                >
                  <p>8 câu hỏi</p>
                  <p>Ngày tạo: 20/01/2022 08:35</p>
                  <span>3 lượt chơi</span>
                </Card>
              ))}
              <Pagination
                className="next-page"
                defaultCurrent={1}
                pageSize={LIMIT}
                current={current}
                total={total}
                onChange={(val) => setOffset((val - 1) * LIMIT)}
              />
            </div>
          )}
          <br />
        </div>
      </div>
    </MainLayout>
  );
};

export default Quizzes;
