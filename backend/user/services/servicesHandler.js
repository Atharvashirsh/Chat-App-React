const addNewUser = require("./addNewUser");
const findUserByEmail = require("./findUserByEmail");
const getLoginDetailsByEmail = require("./getLoginDetailsByEmail");

const userServices = { findUserByEmail, addNewUser, getLoginDetailsByEmail };

module.exports = userServices;
