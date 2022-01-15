import React from "react";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

const AuthLayout = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default AuthLayout;
