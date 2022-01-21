import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import "./styles.scss";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Link to="/quiz">
          <div className="logo">Poly Quiz game</div>
        </Link>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/quiz">Quiz</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/report">Report</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/private">Private</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/play">Play</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
