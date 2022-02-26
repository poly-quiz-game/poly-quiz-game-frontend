import React from "react";
import { Route, Routes } from "react-router-dom";
import Endgame from "./pages/endGame";

const Index = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Endgame {...props} />} />
    </Routes>
  );
};

export default Index;
