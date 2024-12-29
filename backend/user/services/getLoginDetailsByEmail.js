const conn = require("../../connection/db_conn");

const getLoginDetailsByEmail = async (email) => {
    const sql = `SELECT * FROM users WHERE email=?`;
    const [rows] = await conn.promise().query(sql, [email]);
    return rows;
};

module.exports = getLoginDetailsByEmail;
