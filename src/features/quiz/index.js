import React from "react";
import { Route, Routes } from "react-router-dom";

import Quizzes from "./pages/Quizzes";
import UpdateQuiz from "./pages/UpdateQuiz";
import DetailQuiz from "./pages/DetailQuiz";

const QuizFeature = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Quizzes {...props} />} />
      <Route path="/detail/:id" element={<DetailQuiz {...props} />} />
      {/* <Route path="/start/:id" element={<StartQuiz {...props} />} /> */}
      <Route path="/update/:id" element={<UpdateQuiz {...props} />} />
    </Routes>
  );
};

export default QuizFeature;
