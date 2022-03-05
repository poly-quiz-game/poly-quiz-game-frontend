import React from "react";
import { Route, Routes } from "react-router-dom";
import Player from "./pages/Player";
import Question from "./pages/Question";

import Report from "./pages/Report";
import ReportDetail from "./pages/ReportDetail";

const ReportFeature = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Report {...props} />} />
      <Route path="detail/:id" element={<ReportDetail {...props} />} />
    </Routes>
  );
};

export default ReportFeature;
