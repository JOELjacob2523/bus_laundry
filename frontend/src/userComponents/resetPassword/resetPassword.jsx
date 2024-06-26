import React, { useState } from "react";
import { resetPassword } from "../../servers/userRequests/postUserRequest";

const ResetPasswordForm = () => {
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    try {
      await resetPassword(confirmationNumber, newPassword);
      alert("Password reset successfully.");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <input
        type="text"
        placeholder="Confirmation number"
        value={confirmationNumber}
        onChange={(e) => setConfirmationNumber(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPasswordForm;
