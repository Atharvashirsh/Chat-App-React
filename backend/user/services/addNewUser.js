const conn = require("../../connection/db_conn");

const addNewUser = async ({ name, email, password, pic }) => {
    const sql = pic ? `INSERT INTO users(name,email,password,pic) VALUES(?,?,?,?)` : `INSERT INTO users(name,email,password) VALUES(?,?,?)`;
    const [rows] = await conn.promise().query(sql, pic ? [name, email, password, pic] : [name, email, password]);
    return rows;
};

module.exports = addNewUser;
