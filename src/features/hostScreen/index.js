import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import io from "socket.io-client";

import Lobby from "./pages/Lobby";
import HostGame from "./pages/HostGame";
import StartGame from "./pages/StartGame";

const HostScreen = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.ENDPOINT);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  if (!socket) return <div>Connecting</div>;

  return (
    <Routes>
      <Route
        path="/lobby/:hostSocketId"
        element={<Lobby {...props} socket={socket} />}
      />
      <Route
        path="/start/:id"
        element={<StartGame {...props} socket={socket} />}
      />
      <Route
        path="/game/:id"
        element={<HostGame {...props} socket={socket} />}
      />
    </Routes>
  );
};

export default HostScreen;
