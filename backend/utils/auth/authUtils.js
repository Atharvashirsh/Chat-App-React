const generateHash = require("./generateHash");
const generateToken = require("./generateToken");
const compareHash = require("./compareHash");

const AuthUtils = { generateHash, generateToken, compareHash };

module.exports = AuthUtils;
