const router = require("express").Router();
const CONTORLLER = require("../controller/userInfo");
const multer = require("multer");
const upload = multer();
// const { Builder, By, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

//router to singup
router.post("/signup", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.createUser(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password
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

router.get("/check_auth", (req, res) => {
  if (req.session && req.session.token) {
    return res.status(200).json({ message: "Authenticated" });
  }
  res.status(401).json({ message: "Unauthorized" });
});

router.post("/login", upload.fields([]), async (req, res, next) => {
  try {
    const { user, token } = await CONTORLLER.confirmUser(
      req,
      req.body.email,
      req.body.password
    );
    // req.session.token = token;
    res.status(200).json({
      message: "User confirmed successfully",
      token: req.session.token,
    });
  } catch (err) {
    console.error("Error confirming user credentials:", err);
    res
      .status(500)
      .json({ message: "Error confirming user", error: err.message });
  }
});

module.exports = router;
