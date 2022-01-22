import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Quiz from "./features/quiz";
import Room from "./features/room";
import Auth from "./features/auth";
import Sample from "./features/sample";

import PrivateRoute from "./privateRoute";
import AuthLayout from "layouts/auth.layout";

import "antd/dist/antd.min.css";
import Report from "./features/report";
import Deltai from "./features/quiz deltai/pages/deltai";

const Private = () => {
  return "Private";
};

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`ws://localhost:3005`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <BrowserRouter>
      {socket && (
        <Routes>
          <Route path="/" element={<Sample />} />
          <Route path="/quiz/*" element={<Quiz socket={socket} />} />
          <Route path="/report/*" element={<Report socket={socket} />} />
          <Route path="/room" element={<Room socket={socket} />} />
          <Route path='/deltai' element={<Deltai/>}/>
          <Route
            path="/auth/*"
            element={
              <AuthLayout>
                <Auth socket={socket} />
              </AuthLayout>
            }
          />
          <Route exact path="/private" element={<PrivateRoute />}>
            <Route exact path="/private" element={<Private />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
