import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { checkAuth } from "../../servers/userRequests/getUserRequest";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await checkAuth();
        if (response.data && response.data.user_id) {
          setUserId(response.data.user_id);
        }
      } catch (err) {
        console.error("Error authenticating user:", err);
        setUserId(null);
      }
    };

    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
