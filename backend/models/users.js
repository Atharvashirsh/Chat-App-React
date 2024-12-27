const conn = require("../connection/db_conn");

const createUsersModel = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            pic VARCHAR(255) DEFAULT "https://w7.pngwing.com/pngs/717/24/png-transparent-computer-icons-user-profile-user-account-avatar-heroes-silhouette-black-thumbnail.png",
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
