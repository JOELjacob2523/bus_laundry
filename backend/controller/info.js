const { knex } = require('../db')

module.exports = {
    insertUserInfo,
    getUserInfo
}

async function insertUserInfo(userInfo) {
    return await knex("users").insert({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        age: userInfo.age,
        address1: userInfo.address1,
        address2: userInfo.address2,
        city: userInfo.city,
        state: userInfo.state,
        zip_code: userInfo.zip_code
    })
}

async function getUserInfo() {
    return await knex("users").select();
}