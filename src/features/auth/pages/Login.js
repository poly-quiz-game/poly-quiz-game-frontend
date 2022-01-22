import React from "react";
import { Button, Row, Col } from "antd";

import "./styles.css";
import GoogleLogin from "react-google-login";
import authApi from "api/authApi";

const Login = () => {
  const responseGoogle = async  (response) => {
    console.log(response);
    const data = await  authApi.login({tokenId: response.tokenId})
    console.log(data);
  }
  return (
    <div className="auth-screen">
      <Row>
        <Col span={12} offset={6}>
          <Col span={12} offset={8}>
              <GoogleLogin
                  clientId={process.env.REACT_APP_O2AUTH_CLIENT_ID}
                  buttonText="Login with google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  hostedDomain="fpt.edu.vn"
              />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
