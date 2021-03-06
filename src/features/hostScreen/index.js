import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";

import Lobby from "./pages/Lobby";
import HostGame from "./pages/HostGame";
import StartGame from "./pages/StartGame";

const port = process.env.ENDPOINT || "ws://localhost:3005";

const OnConnect = ({ socket, ...props }) => {
  useEffect(() => {
    return () => {
      console.log("disconnect");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Routes>
      <Route
        path="/lobby/:hostSocketId"
        element={<Lobby {...props} socket={socket} />}
      />
      <Route
        path="/game/:id"
        element={<HostGame {...props} socket={socket} />}
      />
    </Routes>
  );
};

const HostScreen = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(port);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  if (!socket) return <div>Connecting</div>;

  return (
    <Routes>
      <Route
        path="/start/:id"
        element={<StartGame {...props} socket={socket} />}
      />
      <Route
        element={<OnConnect {...props} socket={socket} />}
        path="/play/*"
        {...props}
        socket={socket}
      />
    </Routes>
  );
};

export default HostScreen;
