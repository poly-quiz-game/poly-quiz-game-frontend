import React, { useEffect } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Input, Menu, Row, Skeleton, Tabs } from "antd";

import { Link, Outlet } from "react-router-dom";
import MainLayout from "layouts/main.layout";
import { fetchReport, selectReport } from "../reportSlice";
import { selectLoading } from "../../hostScreen/quizSlice";
import Player from "./Player";
import Question from "./Question";

const ReportDetail = () => {
  let params = useParams();
  const dispatch = useDispatch();

  const [tab, setTab] = React.useState("players");

  const report = useSelector(selectReport);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchReport(params.id));
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="conten">
        <Row>
          <Col span={20} offset={2}>
            <Row>
              <Col span={6}>
                <div>
                  <h5>Live</h5>
                  <h2>{report?.quiz?.name}</h2>
                  <p>{moment(report).format("DD-MM-YYYY HH:mm")}</p>
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
                      <p>{report?.quiz?.questions?.length}</p>
                    </div>
                    <p>Câu hỏi</p>
                  </div>
                  <div className="synthetic">
                    <div className="synthetic-div">
                      <i className="fas fa-user-plus"></i>
                      <p>{report?.players?.length}</p>
                    </div>
                    <p>Người tham gia</p>
                  </div>
                </Row>
              </Col>
            </Row>
            <Tabs defaultActiveKey="players" onChange={(val) => setTab(val)}>
              <Tabs.TabPane tab="Người chơi" key="players">
                <Player report={report} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Câu hỏi" key="questions">
                <Question report={report} />
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ReportDetail;
