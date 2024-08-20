import React from "react";
import { Outlet, Navigate, } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
function PrivateRoutes() {
  const { currentUser } = React.useContext(AuthContext);
  
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
