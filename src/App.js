import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./features/quiz";
import Auth from "./features/auth";

import PrivateRoute from "./privateRoute";
import AuthLayout from "layouts/auth.layout";

import "antd/dist/antd.min.css";
import Report from "./features/report";
import HostScreen from "./features/hostScreen";
import Play from "./features/playerScreen";
import Endgame from "./features/endGame/pages/endGame";
import Listquiz from "./features/listQuiz/pages/listQuiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="listQuiz/*"
          element={
            <PrivateRoute>
              <Listquiz />
            </PrivateRoute>
          }
        />
        <Route
          path="Endgame/*"
          element={
            <PrivateRoute>
              <Endgame />
            </PrivateRoute>
          }
        />
        <Route
          path="quiz/*"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/host/*"
          element={
            <PrivateRoute>
              <HostScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/report/*"
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
        <Route
          path="/play/*"
          element={
            <PrivateRoute>
              <Play />
            </PrivateRoute>
          }
        />
        <Route
          path="/auth/*"
          element={
            <AuthLayout>
              <Auth />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
