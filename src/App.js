import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./features/quiz";
import Auth from "./features/auth";

import PrivateRoute from "./privateRoute";
import AuthLayout from "layouts/auth.layout";

import "antd/dist/antd.min.css";
import Report from "./features/report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="quiz/*"
          element={
            <PrivateRoute>
              <Quiz />
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
