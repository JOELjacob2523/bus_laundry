require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const SECRET_KEY = process.env.SECRET_KEY;
const nodemailer = require("nodemailer");
const CONFIG = require("../config.json");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
require("@babel/register")({
  presets: ["@babel/preset-react"],
});
const EmailTemplate = require("../emailTamplate/emailTamplate");

module.exports = {
  createUser,
  confirmUser,
  sendEmail,
  resetPassword,
  getStudentLoginInfo,
  updateUserProfile,
  verifyAdminPassword,
};

// create user
async function createUser(
  first_name,
  last_name,
  email,
  password,
  parent_admin_id,
  yeshiva
) {
  // Check if email already exists
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
    role: "User",
    parent_admin_id: parent_admin_id,
    yeshiva: yeshiva,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await knex("users").insert({
    first_name,
    last_name,
    email,
    password: hashedPassword,
    token,
    role: "User",
    parent_admin_id,
    yeshiva,
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

function generateConfirmationNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

let usersEmail;

async function sendEmail(email) {
  confirmationNumber = generateConfirmationNumber();
  usersEmail = email;

  const token = jwt.sign({ email, confirmationNumber }, SECRET_KEY, {
    expiresIn: "1h",
  });

  await knex("users").where({ email: email }).update({ token });

  const emailContent = ReactDOMServer.renderToStaticMarkup(
    React.createElement(EmailTemplate, { confirmationNumber })
  );

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
    html: emailContent,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return token;
}

// reset password
async function resetPassword(newPassword, confirmationNumber) {
  const user = await knex("users").select().where("email", usersEmail).first();
  const decoded = jwt.verify(user.token, SECRET_KEY);

  if (Number(decoded.confirmationNumber) === Number(confirmationNumber)) {
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    const payload = {
      password: hashedPassword,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    return knex("users")
      .where({ email: usersEmail })
      .update({ password: hashedPassword, token });
  } else {
    throw new Error("Failed to reset password");
  }
}

async function getStudentLoginInfo(id) {
  return await knex("users").select().where("user_id", id).first();
}

async function updateUserProfile(profileInfo) {
  const {
    user_id,
    first_name,
    last_name,
    email,
    password,
    token,
    role,
    parent_admin_id,
    yeshiva,
  } = profileInfo;

  const user = await knex("users").where("user_id", user_id).first();

  let newHashedPassword;
  if (password === user.password) {
    newHashedPassword = user.password;
  } else {
    const passwordMatch = await bcrypt.compare(password, user.password);
    newHashedPassword = passwordMatch
      ? user.password
      : await bcrypt.hash(password, 8);
  }

  const newRole =
    role !== undefined && role !== null && role !== "" ? role : user.role;

  return knex("users")
    .where("user_id", user_id)
    .update({
      first_name,
      last_name,
      email,
      password: newHashedPassword,
      token,
      role: newRole,
      parent_admin_id: newRole === "Administrator" ? null : parent_admin_id,
      yeshiva,
    });
}

async function verifyAdminPassword(inputPassword) {
  const admins = await knex("users").select().where("role", "Administrator");

  if (!admins) {
    throw new Error("Invalid password");
  }

  // Check passwords and return true if any match
  const results = await Promise.all(
    admins.map(async (admin) => {
      const isValid = await bcrypt.compare(inputPassword, admin.password);
      return isValid;
    })
  );

  // If any match, return true
  return results.some((isValid) => isValid);
}
