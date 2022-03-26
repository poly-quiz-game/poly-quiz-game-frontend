import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Regist from "./pages/Regist";

const AuthFeature = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/regist" element={<Regist />} />
    </Routes>
  );
};

export default AuthFeature;
