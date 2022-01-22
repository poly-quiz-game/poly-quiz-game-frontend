import React from "react";
import { Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import GoogleLogin from "react-google-login";
import authApi from "api/authApi";

import { fetchLogin, authActions } from "../authSlice";

import "./styles.css";

const Login = () => {
  const dispatch = useDispatch();

  const responseGoogle = async ({ tokenId }) => {
    const { token } = await authApi.login({ tokenId: tokenId });
    localStorage.setItem("access_token", token);
    // console.log(fetchLogin({ tokenId: response.tokenId }));
    // return dispatch(authActions.logout());
    location.href = "/";
    // return dispatch(fetchLogin({ tokenId }));
  };

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
              cookiePolicy={"single_host_origin"}
              hostedDomain="fpt.edu.vn"
            />
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
