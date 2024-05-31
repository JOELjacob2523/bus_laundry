require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  insertUserInfo,
  getAllUserInfo,
  getUserInfoById,
  updateUserInfo,
  deleteUser,
};

async function insertUserInfo(userInfo) {
  try {
    const [userId] = await knex("users").insert({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      age: userInfo.age,
      address1: userInfo.address1,
      address2: userInfo.address2,
      city: userInfo.city,
      state: userInfo.state,
      zip_code: userInfo.zip_code,
    });

    const token = jwt.sign({ user_id: userId }, SECRET_KEY, {
      expiresIn: "1h",
    });
    await knex("users").where({ user_id: userId }).update({ token });

    return { userId, token };
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}

async function getAllUserInfo() {
  return await knex("users").select();
}

async function getUserInfoById(id) {
  return await knex("users").select().where("user_id", id).first();
}

async function updateUserInfo(user) {
  const {
    user_id,
    first_name,
    last_name,
    age,
    address1,
    address2,
    city,
    state,
    zip_code,
  } = user;
  return knex("users").where({ user_id, user_id }).update({
    first_name,
    last_name,
    age,
    address1,
    address2,
    city,
    state,
    zip_code,
  });
}

async function deleteUser(id) {
  return await knex("users").where("user_id", id).del();
}
