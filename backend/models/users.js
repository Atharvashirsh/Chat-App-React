const conn = require("../connection/db_conn");

const createUsersModel = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            pic VARCHAR(255) DEFAULT "https://res.cloudinary.com/dpzfaadas/image/upload/v1735139847/yrazfwylraazysj1jv46.svg",
            isadmin BOOLEAN NOT NULL DEFAULT FALSE
        )
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("Table 'users' created successfully.");
        }
    });
};

module.exports = createUsersModel;
