// import React, { createContext, useContext, useState, useEffect } from "react";
// import { checkAuth } from "../../servers/userRequests/getUserRequest";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const authenticateUser = async () => {
//       try {
//         const response = await checkAuth();
//         if (response && response.user_id) {
//           setUserId(response.user_id);
//         }
//       } catch (err) {
//         console.error("Error authenticating user:", err);
//         setUserId(null);
//       }
//     };

//     authenticateUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { checkAuth } from "../../servers/userRequests/getUserRequest";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const authenticateUser = async () => {
//       try {
//         const result = await checkAuth();
//         setIsAuthenticated(result.isAuthenticated);
//         setUserId(result.user_id);
//       } catch (error) {
//         console.warn("User is not authenticated:", error);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     authenticateUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, userId, setIsAuthenticated }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    userId: null,
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
