import React from "react";
import { Route, Routes } from "react-router-dom";

import EnterPin from "./pages/EnterPin";
import PlayGame from "./pages/PlayGame";
import PreStart from "./pages/PreStart";

import "./styles.scss";

const GameFeature = (props) => {
  return (
    <Routes>
      <Route path="/enter-pin" element={<EnterPin {...props} />} />
      <Route path="/enter-pin/:pin" element={<EnterPin {...props} />} />
      <Route path="/pre-start/:pin&:name" element={<PreStart {...props} />} />
      <Route path="/play-game/:socketid" element={<PlayGame {...props} />} />
    </Routes>
  );
};

export default GameFeature;
