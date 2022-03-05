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
import Home from "./features/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
