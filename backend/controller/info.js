require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  insertUserInfo,
  getAllUserInfo,
  getUserIDInfo,
};

async function insertUserInfo(userInfo) {
  try {
    const [user_id] = await knex("users").insert({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      age: userInfo.age,
      address1: userInfo.address1,
      address2: userInfo.address2,
      city: userInfo.city,
      state: userInfo.state,
      zip_code: userInfo.zip_code,
    });

    const token = jwt.sign({ user_id: user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    await knex("users").where({ user_id: user_id }).update({ token });

    return { user_id, token };
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}

async function getAllUserInfo() {
  return await knex("users").select();
}

async function getUserIDInfo(id) {
  return await knex("users").select().where("user_id", id);
}
