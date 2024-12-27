const conn = require("../../connection/db_conn");

const findUserByEmail = async (email) => {
    const sql = `SELECT id, name, email, pic FROM users WHERE email=?`;
    const [rows] = await conn.promise().query(sql, [email]);
    return rows;
};

module.exports = findUserByEmail;
