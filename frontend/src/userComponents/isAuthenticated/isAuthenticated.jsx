// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ isAuthenticated, children }) => {
//   const navigate = useNavigate();
//   return isAuthenticated ? children : navigate("/");
// };

// export default ProtectedRoute;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return isAuthenticated ? children : navigate("/");
};

export default ProtectedRoute;
