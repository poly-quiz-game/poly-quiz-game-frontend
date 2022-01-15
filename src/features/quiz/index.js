import React from "react";
import { Route, Routes } from "react-router-dom";

import Quizzes from "./pages/Quizzes";
import StartQuiz from "./pages/StartQuiz";

const QuizFeature = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Quizzes {...props} />} />
      <Route path="/start/:id" element={<StartQuiz {...props} />} />
    </Routes>
  );
};

export default QuizFeature;
