import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./api/axiosClient";

const PrivateRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
