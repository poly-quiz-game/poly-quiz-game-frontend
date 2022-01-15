import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

import Quiz from "./features/quiz";
import Room from "./features/room";

import PrivateRoute from "./privateRoute";
import MainLayout from "./layouts/main.layout";

import "antd/dist/antd.min.css";

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
          <Route
            path="/"
            element={
              <MainLayout>
                <div>Home</div>
              </MainLayout>
            }
          />
          <Route
            path="/quiz/*"
            element={
              <MainLayout>
                <Quiz socket={socket} />
              </MainLayout>
            }
          />
          <Route
            path="/room"
            element={
              <MainLayout>
                <Room socket={socket} />
              </MainLayout>
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
