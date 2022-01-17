import React from "react";
import { Route, Routes } from "react-router-dom";

import EnterPin from "./pages/EnterPin";

import "./styles.scss";

const GameFeature = (props) => {
  return (
    <Routes>
      <Route path="/enter-pin" element={<EnterPin {...props} />} />
      <Route path="/enter-pin/:pin" element={<EnterPin {...props} />} />
    </Routes>
  );
};

export default GameFeature;
