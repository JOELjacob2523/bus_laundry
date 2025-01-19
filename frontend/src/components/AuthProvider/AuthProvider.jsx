import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import {
  getAllPaymentInfoByAdminID,
  getAllStudentInfoByAdminID,
  getAllZmanGoalInfoByAdminId,
} from "../../servers/getRequest";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    isAuthenticated: false,
    userId: null,
    parent_admin_id: null,
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    yeshiva: "",
  });
  const [studentData, setStudentData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [zmanGoalData, setZmanGoalData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const studentInfo = await getAllStudentInfoByAdminID(
        authData.parent_admin_id
      );
      const paymentInfo = await getAllPaymentInfoByAdminID(
        authData.parent_admin_id
      );

      const zmanGoalInfo = await getAllZmanGoalInfoByAdminId(
        authData.parent_admin_id
      );
      setStudentData(studentInfo);
      setPaymentData(paymentInfo);
      setZmanGoalData(zmanGoalInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [authData.parent_admin_id]);

  useEffect(() => {
    if (authData.parent_admin_id) {
      fetchData();
    }
  }, [authData.parent_admin_id, fetchData]);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, studentData, paymentData, zmanGoalData }}
    >
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
