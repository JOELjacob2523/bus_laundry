const router = require("express").Router();
const CONTORLLER = require("../controller/userInfo");
const multer = require("multer");
const upload = multer();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
// const { Builder, By, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

//router to singup
router.post("/signup", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.createUser(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
      req.body.parent_admin_id,
      req.body.yeshiva
    );
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

router.post("/login", upload.fields([]), async (req, res, next) => {
  try {
    const { user } = await CONTORLLER.confirmUser(
      req,
      req.body.email,
      req.body.password
    );

    const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY);
    req.session.token = token;

    let userInfo = await CONTORLLER.getStudentLoginInfo(user.user_id);

    res.status(200).json({
      message: "User confirmed successfully",
      token: req.session.token,
      user_id: user.user_id,
      userInfo: userInfo,
    });
  } catch (err) {
    console.error("Error confirming user credentials:", err);
    res
      .status(500)
      .json({ message: "Error confirming user", error: err.message });
  }
});

router.get("/check_auth", (req, res) => {
  try {
    if (req.session && req.session.token) {
      const decoded = jwt.verify(req.session.token, SECRET_KEY);
      return res
        .status(200)
        .json({ message: "Authenticated", user_id: Number(decoded.user_id) });
    }
    res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// router to verify admin password
router.get(
  "/verify_admin_password",
  upload.fields([]),
  async (req, res, next) => {
    try {
      const result = await CONTORLLER.verifyAdminPassword(req.query.password);
      res.status(200).json(result);
    } catch (err) {
      console.error("Error verifying admin password:", err);
      res.status(500).json({
        message: "Error verifying admin password",
        error: err.message,
      });
    }
  }
);

// router get student login info
router.get("/get_student_login_info", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing user_id" });
    }

    let userInfo = await CONTORLLER.getStudentLoginInfo(user_id);
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error getting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/forgot_password", upload.fields([]), async (req, res, next) => {
  try {
    const { email } = req.body;
    await CONTORLLER.sendEmail(email);
    res.status(200).json({
      message: "Email send successfully",
    });
  } catch (err) {
    console.error("Error confirming email sending:", err);
    res
      .status(500)
      .json({ message: "Error sending email", error: err.message });
  }
});

router.post("/reset_password", upload.fields([]), async (req, res, next) => {
  try {
    const { newPassword, confirmationNumber } = req.body;
    await CONTORLLER.resetPassword(newPassword, confirmationNumber);
    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error("Error reseting password:", err);
    res
      .status(500)
      .json({ message: "Error reseting password", error: err.message });
  }
});

// router to update student payment
router.post(
  "/update_user_profile_info",
  upload.fields([]),
  async (req, res, next) => {
    try {
      let { user_id } = await CONTORLLER.updateUserProfile(req.body);
      req.session.user_id = user_id;
      res.status(200).json({
        message: "User updated successfully",
        token: req.session.token,
      });
    } catch (err) {
      console.error("Error updating user credentials:", err);
      res
        .status(500)
        .json({ message: "Error updaing user", error: err.message });
    }
  }
);

module.exports = router;
