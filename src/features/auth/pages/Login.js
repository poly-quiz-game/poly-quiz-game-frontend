import React from "react";
import { Button, Row, Col } from "antd";

import "./styles.css";

const Login = () => {
  return (
    <div className="auth-screen">
      <Row>
        <Col span={12} offset={6}>
          <Col span={12} offset={8}>
            <Button type="primary">Đăng nhập bằng Google</Button>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
