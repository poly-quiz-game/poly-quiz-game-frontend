import React from "react";
import { Card } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.scss";

const quizzes = [{ _id: 123 }];

const Sample = () => {
  return (
    <MainLayout>
      <div className="sample">
        <h1>Sample</h1>
      </div>
    </MainLayout>
  );
};

export default Sample;
