import React from "react";
import { Route, Routes } from "react-router-dom";

import Report from "./pages/Report";

const ReportFeature = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Report {...props} />} />
    </Routes>
  );
};

export default ReportFeature;
