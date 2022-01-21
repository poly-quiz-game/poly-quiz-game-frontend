import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Quiz from "./features/quiz";
import HostScreen from "./features/hostScreen";
import PlayerScreen from "./features/playerScreen";
import Auth from "./features/auth";
import Sample from "./features/sample";

import PrivateRoute from "./privateRoute";
import AuthLayout from "layouts/auth.layout";

import "antd/dist/antd.min.css";
import Report from "./features/report";

const Private = () => {
  return "Private";
};

function App() {
  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io(`ws://localhost:3005`);
  //   setSocket(newSocket);

  //   return () => newSocket.close();
  // }, [setSocket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sample />} />
        <Route path="/quiz/*" element={<Quiz />} />
        <Route path="/report/*" element={<Report />} />
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
        <Route exact path="/private" element={<PrivateRoute />}>
          <Route exact path="/private" element={<Private />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
