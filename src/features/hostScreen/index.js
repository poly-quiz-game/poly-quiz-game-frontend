import React from "react";
import { Route, Routes } from "react-router-dom";

import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

const GameFeature = (props) => {
  return (
    <Routes>
      <Route path="/lobby" element={<Lobby {...props} />} />
      <Route path="/game/:id" element={<Game {...props} />} />
    </Routes>
  );
};

export default GameFeature;
