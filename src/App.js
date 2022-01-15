import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";

import ListQuizzes from "./features/listQuizzes";
import CreateRoom from "./features/createRoom";
import Lobby from "./features/lobby";

import "./App.css";
import "antd/dist/antd.css";

const JoinRoom = () => {
  return "JoinRoom";
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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/quizzes">ListQuizzes</Link>
            </li>
            <li>
              <Link to="/join-room">JoinRoom</Link>
            </li>
          </ul>
        </nav>
        {socket && (
          <Routes>
            <Route path="/quizzes" element={<ListQuizzes socket={socket} />} />
            <Route path="/join-room" element={<JoinRoom socket={socket} />} />
            <Route
              path="/create-room/quizId=:quizId"
              element={<CreateRoom socket={socket} />}
            />
            <Route
              path="/lobby/quizId=:quizId"
              element={<Lobby socket={socket} />}
            />
            <Route path="/" element={<div>Home</div>} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
