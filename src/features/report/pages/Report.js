import React from "react";
import { Skeleton } from "antd";

import { Link } from "react-router-dom";
import MainLayout from "layouts/main.layout";

import "./styles.css";

const Report = ({ socket }) => {
  return (
    <MainLayout>
      <div className="report">report</div>
    </MainLayout>
  );
};

export default Report;
