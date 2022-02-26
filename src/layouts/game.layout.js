import React from "react";
import { Layout, Menu} from "antd";
import { Link } from "react-router-dom";

const {  Content } = Layout;

const GameLayout = ({ children }) => {
  return (
    <Layout>
      {/* <Header className="header"> */}

      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">
          <Link to="/quizzes">ListQuizzes</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/join-room">JoinRoom</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/private">Private</Link>
        </Menu.Item>
      </Menu>
      {/* </Header> */}
      <Content>{children}</Content>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
};

export default GameLayout;
