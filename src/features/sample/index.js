import React from "react";
import { Image } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";
import logo from "../../assets/logo.png"; // Tell webpack this JS file uses this image

import "./styles.scss";

const quizzes = [{ _id: 123 }];

const Sample = () => {
  return (
    <MainLayout>
      <div className="sample">
        <div className="enter-pin">
          <Image width={300} src={logo} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Sample;
