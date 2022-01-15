import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const AuthFeature = (props) => {
  return (
    <Routes>
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/signup" element={<SignUp {...props} />} />
    </Routes>
  );
};

export default AuthFeature;
