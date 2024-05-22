const router = require("express").Router();
const CONTORLLER = require("../controller/info");
const multer = require("multer");
const upload = multer();

router.post("/user_info", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.insertUserInfo(req.body);
    res
      .status(200)
      .json({ message: "User created successfully", token: req.session.token });
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

router.get("/get_all_user_info", async (req, res, next) => {
  try {
    let userInfo = await CONTORLLER.getAllUserInfo();
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/get_user_info", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    const userInfo = await CONTORLLER.getUserInfoById(user_id);
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/update_user_info", upload.fields([]), async (req, res, next) => {
  try {
    let { user_id } = await CONTORLLER.updateUserInfo(req.body);
    req.session.user_id = user_id;
    res
      .status(200)
      .json({ message: "User updated successfully", token: req.session.token });
  } catch (err) {
    console.error("Error updating user credentials:", err);
    res.status(500).json({ message: "Error updaing user", error: err.message });
  }
});

module.exports = router;
