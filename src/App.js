import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Quiz from "./features/quiz";
import HostScreen from "./features/hostScreen";
import PlayerScreen from "./features/playerScreen";
import Auth from "./features/auth";
import Sample from "./features/sample";

import PrivateRoute from "./privateRoute";
import AuthLayout from "layouts/auth.layout";

import "antd/dist/antd.min.css";
import Report from "./features/report";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sample />} />
        <Route exact path="/quiz/*" element={<PrivateRoute />}>
          <Route path="/quiz/*" element={<Quiz />} />
        </Route>
        <Route exact path="/report/*" element={<PrivateRoute />}>
          <Route path="/report/*" element={<Report />} />
        </Route>
        <Route path="/host/*" element={<HostScreen />} />
        <Route path="/play/*" element={<PlayerScreen />} />
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
