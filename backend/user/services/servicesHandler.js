const addNewUser = require("./addNewUser");
const findUserByEmail = require("./findUserByEmail");

const userServices = { findUserByEmail, addNewUser };

module.exports = userServices;
