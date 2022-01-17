import React from "react";
import { Route, Routes } from "react-router-dom";

import Lobby from "./pages/Lobby";

const GameFeature = (props) => {
  return (
    <Routes>
      <Route path="/lobby" element={<Lobby {...props} />} />
    </Routes>
  );
};

export default GameFeature;
