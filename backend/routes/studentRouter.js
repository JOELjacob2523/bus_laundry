const router = require("express").Router();
const CONTORLLER = require("../controller/studentInfo");
const multer = require("multer");
const upload = multer();
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// router to create a new student
router.post("/student_info", upload.fields([]), async (req, res, next) => {
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

// router get all student info
router.get("/get_all_user_info", async (req, res, next) => {
  try {
    let userInfo = await CONTORLLER.getAllUserInfo();
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error getting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get all student info by admin id
router.get("/get_all_student_info_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let studentInfo = await CONTORLLER.getAllStudentInfoByAdminID(user_id);
    res.status(200).json(studentInfo);
  } catch (err) {
    console.error("Error getting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get student info by ID
router.get("/get_user_info", async (req, res, next) => {
  try {
    const { student_id } = req.query;
    const userInfo = await CONTORLLER.getUserInfoById(student_id);
    res.status(200).json(userInfo);
  } catch (err) {
    console.error("Error inserting user credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get student payment info by student ID
router.get("/get_payment_info", async (req, res, next) => {
  try {
    const { student_id } = req.query;
    const paymentInfo = await CONTORLLER.getPaymentInfoByStudentId(student_id);
    res.status(200).json(paymentInfo);
  } catch (err) {
    console.error("Error inserting payment credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to update a student
router.post("/update_user_info", upload.fields([]), async (req, res, next) => {
  try {
    let { student_id } = await CONTORLLER.updateUserInfo(req.body);
    req.session.student_id = student_id;
    res.status(200).json({
      message: "User updated successfully",
      token: req.session.token,
    });
  } catch (err) {
    console.error("Error updating user credentials:", err);
    res.status(500).json({ message: "Error updaing user", error: err.message });
  }
});

// router get all payment info by admin id
router.get("/get_all_payment_info_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let paymentInfo = await CONTORLLER.getAllPaymentInfoByAdminId(user_id);
    res.status(200).json(paymentInfo);
  } catch (err) {
    console.error("Error getting payment credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to update student payment
router.post(
  "/update_user_payment_info",
  upload.fields([]),
  async (req, res, next) => {
    try {
      let { student_id } = await CONTORLLER.updateUserPaymentInfo(req.body);
      req.session.student_id = student_id;
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

// router to delete a student
router.post("/delete_user", async (req, res, next) => {
  try {
    const { student_id } = req.body;
    await CONTORLLER.deleteUser(student_id);
    // req.session.user_id = user_id;
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user credentials:", err);
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

// router to post payment info
router.post("/payments", async (req, res, next) => {
  try {
    let payments = await CONTORLLER.insertPaymentInfo(req.body);
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error inserting payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to get payment info
router.get("/payments", async (req, res, next) => {
  try {
    let payments = await CONTORLLER.getAllPaymentInfo();
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error getting payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to create the zman goal
router.post("/zman_goal", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.migrateOldZmanGoalData();
    await CONTORLLER.insertZmanGoalInfo(req.body);
    res.status(200).json({ message: "Zman goal created successfully" });
  } catch (err) {
    console.error("Error inserting zman goal credentials:", err);
    res
      .status(500)
      .json({ message: "Error inserting zman goal", error: err.message });
  }
});

// router to update a zman goal
router.post(
  "/update_zman_goal_info",
  upload.fields([]),
  async (req, res, next) => {
    try {
      await CONTORLLER.updateZmanGoalInfo(req.body);
      res.status(200).json({
        message: "Zman goal updated successfully",
      });
    } catch (err) {
      console.error("Error updating zman goal credentials:", err);
      res
        .status(500)
        .json({ message: "Error updaing zman goal", error: err.message });
    }
  }
);

// router to create the zman goal by admin id
router.post(
  "/zman_goal_by_admin_id",
  upload.fields([]),
  async (req, res, next) => {
    try {
      await CONTORLLER.migrateOldZmanGoalDataByAdminId(req.body.user_id);
      await CONTORLLER.insertZmanGoalInfo(req.body);
      res.status(200).json({ message: "Zman goal created successfully" });
    } catch (err) {
      console.error("Error inserting zman goal credentials:", err);
      res
        .status(500)
        .json({ message: "Error inserting zman goal", error: err.message });
    }
  }
);

// router to archive old students & payment
router.post(
  "/archive_oldStudent_payments",
  upload.fields([]),
  async (req, res, next) => {
    const { selectedStudents } = req.body;
    try {
      await CONTORLLER.migrateOldData(selectedStudents);
      res
        .status(200)
        .json({ message: "Old student & payments archived successfully" });
    } catch (err) {
      console.error("Error archiving old student & payments credentials:", err);
      res.status(500).json({
        message: "Error archiving old student & payments",
        error: err.message,
      });
    }
  }
);

// router get all zman goal info
router.get("/get_zman_goal", async (req, res, next) => {
  try {
    let zmanGoal = await CONTORLLER.getAllZmanGoalInfo();
    res.status(200).json(zmanGoal);
  } catch (err) {
    console.error("Error getting zman goal credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get all zman goal info by admin id
router.get("/get_zman_goal_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let zmanGoal = await CONTORLLER.getAllZmanGoalInfoByAdminId(user_id);
    res.status(200).json(zmanGoal);
  } catch (err) {
    console.error("Error getting zman goal credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/submit_cc_form", async (req, res) => {
  const {
    cardNumber,
    expirationMonth,
    expirationYear,
    cvv,
    cardholderName,
    cardholderStreet,
    cardholderZip,
    description,
    amount,
  } = req.body;

  console.log(req.body);

  let options = new chrome.Options();
  options.addArguments("headless");
  options.addArguments("disable-gpu");

  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("https://secure.cardknox.com/congmesivta");

    await driver.wait(until.elementLocated(By.id("xCardNum")), 10000);
    await driver.findElement(By.id("xCardNum")).sendKeys(cardNumber);

    await driver.wait(until.elementLocated(By.id("exp")), 10000);
    await driver.findElement(By.id("exp")).sendKeys(expirationMonth);

    await driver.wait(until.elementLocated(By.id("ccExpYear")), 10000);
    await driver.findElement(By.id("ccExpYear")).sendKeys(expirationYear);

    await driver.wait(until.elementLocated(By.id("xCVV")), 10000);
    await driver.findElement(By.id("xCVV")).sendKeys(cvv);

    await driver.wait(until.elementLocated(By.id("xBillLastName")), 10000);
    await driver.findElement(By.id("xBillLastName")).sendKeys(cardholderName);

    await driver.wait(until.elementLocated(By.id("xBillStreet")), 10000);
    await driver.findElement(By.id("xBillStreet")).sendKeys(cardholderStreet);

    await driver.wait(until.elementLocated(By.id("xBillZip")), 10000);
    await driver.findElement(By.id("xBillZip")).sendKeys(cardholderZip);

    await driver.wait(until.elementLocated(By.id("xDescription")), 10000);
    await driver.findElement(By.id("xDescription")).sendKeys(description);

    await driver.wait(until.elementLocated(By.id("xAmount")), 10000);
    await driver.findElement(By.id("xAmount")).sendKeys(amount);

    // await driver.sleep(300000);

    res.json({ message: "Payment information submitted successfully!" });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      error: "An error occurred while submitting the payment information.",
    });
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
});

// router to insert withdrawal info
router.post("/withdrawals", upload.fields([]), async (req, res, next) => {
  try {
    await CONTORLLER.insertWithdrawalInfo(req.body);
    res.status(200).json({ message: "Withdrawals insert successfully" });
  } catch (err) {
    console.error("Error inserting withdrawals credentials:", err);
    res
      .status(500)
      .json({ message: "Error inserting withdrawals", error: err.message });
  }
});

// router get all withdrawal info
router.get("/get_withdrawal", async (req, res, next) => {
  try {
    let withdrawal = await CONTORLLER.getAllWithdrawalInfo();
    res.status(200).json(withdrawal);
  } catch (err) {
    console.error("Error getting withdrawal credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get all withdrawal info by admin id
router.get("/get_withdrawal_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let withdrawal = await CONTORLLER.getAllWithdrawalInfoByAdminId(user_id);
    res.status(200).json(withdrawal);
  } catch (err) {
    console.error("Error getting withdrawal credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router to delete a withdrawal info
router.post("/delete_withdrawal", async (req, res, next) => {
  try {
    const { withdrawal_id } = req.body;
    await CONTORLLER.deleteWithdrawal(withdrawal_id);
    res.status(200).json({ message: "Withdrawal deleted successfully" });
  } catch (err) {
    console.error("Error deleting withdrawal credentials:", err);
    res
      .status(500)
      .json({ message: "Error deleting withdrawal", error: err.message });
  }
});

// router to update withdrawal info
router.post(
  "/update_withdrawal_info",
  upload.fields([]),
  async (req, res, next) => {
    try {
      let { withdrawal_id } = await CONTORLLER.updateWithdrawalInfo(req.body);
      res.status(200).json({
        message: "Withdrawal updated successfully",
      });
    } catch (err) {
      console.error("Error updating withdrawal credentials:", err);
      res
        .status(500)
        .json({ message: "Error updaing withdrawal", error: err.message });
    }
  }
);

// router get old zman goal info
router.get("/get_old_zman_goal", async (req, res, next) => {
  try {
    let oldZmanGoal = await CONTORLLER.getOldZmanGoalInfo();
    res.status(200).json(oldZmanGoal);
  } catch (err) {
    console.error("Error getting old zman goal credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get old payment info
router.get("/get_old_payments", async (req, res, next) => {
  try {
    let oldPayments = await CONTORLLER.getOldPaymentsInfo();
    res.status(200).json(oldPayments);
  } catch (err) {
    console.error("Error getting old payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get old student info
router.get("/get_old_students", async (req, res, next) => {
  try {
    let oldStudents = await CONTORLLER.getOldStudentsInfo();
    res.status(200).json(oldStudents);
  } catch (err) {
    console.error("Error getting old students credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get old zman goal info by admin id
router.get("/get_old_zman_goal_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let oldZmanGoal = await CONTORLLER.getOldZmanGoalInfoByAdminId(user_id);
    res.status(200).json(oldZmanGoal);
  } catch (err) {
    console.error("Error getting old zman goal credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get old payment info by admin id
router.get("/get_old_payments_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let oldPayments = await CONTORLLER.getOldPaymentsInfoByAdminId(user_id);
    res.status(200).json(oldPayments);
  } catch (err) {
    console.error("Error getting old payments credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// router get old student info by admin id
router.get("/get_old_students_by_admin_id", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    let oldStudents = await CONTORLLER.getOldStudentsInfoByAdminId(user_id);
    res.status(200).json(oldStudents);
  } catch (err) {
    console.error("Error getting old students credentials:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
