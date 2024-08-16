const router = require("express").Router();
const StudentModel = require("./mongoSchema");
const multer = require("multer");
const upload = multer();

router.post("/student_info_mdb", upload.fields([]), async (req, res, next) => {
  try {
    await StudentModel.create(req.body);
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
