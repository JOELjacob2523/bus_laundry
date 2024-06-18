require("dotenv").config();
const { knex } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const { HDate, HebrewDateEvent } = require("@hebcal/core");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  insertUserInfo,
  getAllUserInfo,
  getUserInfoById,
  updateUserInfo,
  deleteUser,
  insertZmanGoalInfo,
  getAllZmanGoalInfo,
  insertPaymentInfo,
  getAllPaymentInfo,
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

async function insertZmanGoalInfo(zmanInfo) {
  try {
    await knex("zman_goal").insert({
      zman: zmanInfo.zman,
      zman_starts_ends: JSON.stringify(zmanInfo.zman_starts_ends),
      closed_weeks: JSON.stringify(zmanInfo.closed_weeks),
      bus_price: zmanInfo.bus_price,
      wash_price: zmanInfo.wash_price,
      total_zman_weeks: zmanInfo.total_zman_weeks,
      total_zman_goal: zmanInfo.total_zman_goal,
      total_bus_goal: zmanInfo.total_bus_goal,
      total_wash_goal: zmanInfo.total_wash_goal,
    });
  } catch (error) {
    console.error("Error inserting zman goal info:", error);
    throw error;
  }
}

async function getAllZmanGoalInfo() {
  return await knex("zman_goal").select();
}

async function insertPaymentInfo(paymentInfo) {
  const hd = new HDate(new Date());
  const ev = new HebrewDateEvent(hd);

  const hebrewDate = ev.render("he-x-NoNikud");
  try {
    const [payment_id] = await knex("payments").insert({
      first_name: paymentInfo.first_name,
      last_name: paymentInfo.last_name,
      payment_type: paymentInfo.payment_type,
      cash: paymentInfo.cash,
      checks: paymentInfo.checks,
      credit_card: paymentInfo.credit_card,
      total_paid: paymentInfo.total_paid,
      student_id: paymentInfo.student_id,
      // pay_date: new Date(),
      pay_date: hebrewDate,
    });

    const token = jwt.sign({ payment_id: payment_id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    await knex("payments").where({ payment_id: payment_id }).update({ token });

    return { payment_id, token };
  } catch (error) {
    console.error("Error inserting user info:", error);
    throw error;
  }
}

async function getAllPaymentInfo() {
  return await knex("payments").select();
}
