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
      <Route path="detail/:id" element={<DetailQuiz />} />
      {/* <Route path="/start/:id" element={<StartQuiz  />} /> */}
      <Route path="update/:id" element={<UpdateQuiz />} />
    </Routes>
  );
};

export default QuizFeature;
