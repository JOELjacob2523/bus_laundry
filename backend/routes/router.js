const router = require("express").Router();
const CONTORLLER = require("../controller/info");
const multer = require("multer");
const upload = multer();
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

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

// router.post("/submit_cc_form", async (req, res) => {
//   const {
//     cardNumber,
//     expirationDate,
//     cvv,
//     cardholderName,
//     cardholderStreet,
//     cardholderZip,
//     description,
//     amount,
//   } = req.body;

//   let options = new chrome.Options();
//   options.addArguments("headless");
//   options.addArguments("disable-gpu");

//   // Set up Selenium WebDriver
//   let driver = await new Builder()
//     .forBrowser("chrome")
//     .setChromeOptions(options)
//     .build();

//   try {
//     await driver.get("https://secure.cardknox.com/congmesivta");

//     const fields = [
//       { name: "Card Number", value: cardNumber },
//       { name: "Expiration", value: expirationDate },
//       { name: "CVV", value: cvv },
//       { name: "Bill Name", value: cardholderName },
//       { name: "Bill Street", value: cardholderStreet },
//       { name: "Zip", value: cardholderZip },
//       { name: "Description", value: description },
//       { name: "Amount", value: amount },
//     ];

//     for (const field of fields) {
//       const element = await driver.wait(
//         until.elementLocated(By.name(field.name)),
//         10000
//       );
//       await driver.wait(until.elementIsVisible(element), 10000);
//       await element.sendKeys(field.value);
//       console.log(`Filled ${field.name} with ${field.value}`);
//     }

//     // Optionally, submit the form if needed
//     // await driver.findElement(By.name('submit_button_name')).click();

//     res.json({ message: "Payment information submitted successfully!" });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).json({
//       error: "An error occurred while submitting the payment information.",
//     });
//   } finally {
//     if (driver) {
//       await driver.quit();
//     }
//   }
// });

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
    console.log("Navigating to the payment page");

    await driver.get("https://secure.cardknox.com/congmesivta");

    // Waiting for the elements to be located and visible
    console.log("Waiting for the submit button to be enabled");

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

    // Optionally, submit the form if needed
    // await driver.findElement(By.name('submit_button_name')).click();

    // await driver.wait(until.elementLocated(By.name("submit")), 50000);
    // await driver.wait(
    //   until.elementIsEnabled(driver.findElement(By.name("submit"))),
    //   50000
    // );
    // await driver.findElement(By.name("submit")).click();

    console.log("Form filled out successfully");

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

module.exports = router;
