require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const SECRET_KEY = process.env.SECRET_KEY;

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
async function confirmUser(first_name, last_name, email, password) {
  const user = await knex("users").where("email", email).first();
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid username or password");
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const id = user.user_id;
  const payload = {
    user_id: id,
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: hashedPassword,
    role: "user",
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await knex("users").where("user_id", id).update({ token });

  const decodedToken = jwt.verify(token, SECRET_KEY);
  const userId = decodedToken.user_id;

  return { user, userId };
}
