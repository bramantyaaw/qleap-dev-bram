import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useKeycloak } from "@react-keycloak/web";

export const ProtectedRoute = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const location = useLocation();

  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  const isLoggedIn = keycloak.authenticated;

  // if (token === null || token === "undefined") {
  if (!isLoggedIn) {
    // return <Navigate to="/login" state={location.pathname} replace />;
    return null;
  } else {
    return <Outlet />;
  }
};
