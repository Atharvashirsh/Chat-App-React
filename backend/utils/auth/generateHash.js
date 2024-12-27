const bcrypt = require("bcrypt");

const generateHash = (password) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.HASH_SALT_ROUNDS));
    return bcrypt.hashSync(password, salt);
};

module.exports = generateHash;
