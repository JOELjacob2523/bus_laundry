require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const SECRET_KEY = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");
const CONFIG = require("../config.json");

module.exports = {
  createUser,
  confirmUser,
};

// create user
async function createUser(first_name, last_name, email, password) {
  const user = await knex("users").where("email", email).first();
  if (user) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const payload = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await knex("users").insert({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    token,
  });
}

// confirm user
async function confirmUser(req, email, password) {
  try {
    const user = await knex("users").select().where("email", email).first();
    if (!user) {
      throw new Error("Invalid username or password");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid username or password");
    }

    const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY);
    req.session.token = token;
    req.session.user_id = user.user_id;

    return { user, user_id: user.user_id };
  } catch (err) {
    console.error("Error confirming user credentials:", err);
    throw err;
  }
}

// send email with confirmation number
const sendEmail = (email, confirmationNumber) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jsjprog4119@gmail.com",
      pass: CONFIG.EMAIL_PASS,
    },
  });

  // Email content
  let mailOptions = {
    from: "jsjprog4119@gmail.com",
    to: email,
    subject: "Password Reset Confirmation",
    text: `Your confirmation number is: ${confirmationNumber}. Use this number to reset your password.`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
