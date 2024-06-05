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
    const [studentId] = await knex("students").insert({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      age: userInfo.age,
      address1: userInfo.address1,
      address2: userInfo.address2,
      city: userInfo.city,
      state: userInfo.state,
      zip_code: userInfo.zip_code,
    });

    const token = jwt.sign({ student_id: studentId }, SECRET_KEY, {
      expiresIn: "1h",
    });
    await knex("students").where({ student_id: studentId }).update({ token });

    return { studentId, token };
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}

async function getAllUserInfo() {
  return await knex("students").select();
}

async function getUserInfoById(id) {
  return await knex("students").select().where("student_id", id).first();
}

async function updateUserInfo(student) {
  const {
    student_id,
    first_name,
    last_name,
    age,
    address1,
    address2,
    city,
    state,
    zip_code,
  } = student;
  return knex("students").where("student_id", student_id).update({
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
  return await knex("students").where("student_id", id).del();
}
