const router = require("express").Router();
const CONTORLLER = require("../controller/studentInfo");
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

router.post("/login", upload.fields([]), async (req, res, next) => {
  try {
    const { user, user_id } = await CONTORLLER.confirmUser(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password
    );
    req.session.token = user.token;
    req.session.user_id = user_id;
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

// router to create a new student
router.post("/user_info", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.insertUserInfo(req.body);
    res.status(200).json({
      message: "Student created successfully",
      token: req.session.token,
    });
  } catch (err) {
    console.error("Error inserting student credentials:", err);
    res
      .status(500)
      .json({ message: "Error creating student", error: err.message });
  }
});

module.exports = router;
