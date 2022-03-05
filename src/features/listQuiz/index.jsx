import React from "react";
import { Route, Routes } from "react-router-dom";
import Listquiz from "./pages/listQuiz";
const Index = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Listquiz {...props} />} />
    </Routes>
  );
};

export default Index;
