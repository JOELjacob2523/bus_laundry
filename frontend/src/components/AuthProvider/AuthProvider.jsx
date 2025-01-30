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
    user_logo: null,
  });
  const [studentData, setStudentData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [zmanGoalData, setZmanGoalData] = useState([]);

  const fetchStudentData = useCallback(async () => {
    try {
      const studentInfo = await getAllStudentInfoByAdminID(
        authData.parent_admin_id
      );
      setStudentData(studentInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [authData.parent_admin_id]);

  const fetchZmanGoalData = useCallback(async () => {
    try {
      const zmanGoalInfo = await getAllZmanGoalInfoByAdminId(
        authData.parent_admin_id
      );
      setZmanGoalData(zmanGoalInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [authData.parent_admin_id]);

  const fetchPaymentData = useCallback(async () => {
    try {
      const paymentInfo = await getAllPaymentInfoByAdminID(
        authData.parent_admin_id
      );
      setPaymentData(paymentInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [authData.parent_admin_id]);

  useEffect(() => {
    if (authData.parent_admin_id) {
      fetchStudentData();
      fetchPaymentData();
      fetchZmanGoalData();
    }
  }, [
    authData.parent_admin_id,
    fetchStudentData,
    fetchPaymentData,
    fetchZmanGoalData,
  ]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
        setStudentData,
        studentData,
        paymentData,
        zmanGoalData,
        fetchStudentData,
      }}
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
