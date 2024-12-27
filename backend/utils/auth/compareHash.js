const bcrypt = require("bcrypt");

const compareHash = (newPassword, oldPassword) => {
    return bcrypt.compareSync(newPassword, oldPassword);
};

module.exports = compareHash;
