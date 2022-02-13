import React from "react";
import { Route, Routes } from "react-router-dom";

import Quizzes from "./pages/Quizzes";
import UpdateQuiz from "./pages/UpdateQuiz";
import DetailQuiz from "./pages/DetailQuiz";
import CreateQuiz from "./pages/CreateQuiz";

const QuizFeature = () => {
  return (
    <Routes>
      <Route index element={<Quizzes />} />
      <Route path="create" element={<CreateQuiz />} />
      <Route path="detail/:id" element={<CreateQuiz />} />
      <Route path="update/:id" element={<CreateQuiz />} />
    </Routes>
  );
};

export default QuizFeature;
