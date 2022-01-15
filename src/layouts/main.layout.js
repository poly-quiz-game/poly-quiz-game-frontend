import React, { useEffect, useState } from "react";
import { Layout, Menu, Sider } from "antd";
import { Link } from "react-router-dom";

import "./styles.scss";

const { Header, Footer, Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      {/* <Header className="header"> */}

      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/quiz">Library</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/join-room">JoinRoom</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/private">Private</Link>
        </Menu.Item>
      </Menu>
      {/* </Header> */}
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
};

export default MainLayout;
