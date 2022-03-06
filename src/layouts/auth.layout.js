import React from "react";
import { Layout } from "antd";

import "./styles.scss";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

const AuthLayout = ({ children }) => {
  return (
    <Layout>
      <Header className="header">
        <Link to="/quiz">
          <div className="logo">Poly Quiz Game</div>
        </Link>
      </Header>
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
