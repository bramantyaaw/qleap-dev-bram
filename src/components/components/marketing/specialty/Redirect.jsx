import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ navigateRoute }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(navigateRoute);
  }, []);
  return <div></div>;
};

export default Redirect;
