const conn = require("../connection/db_conn");

const createChatsModel = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS chats (
            id INT AUTO_INCREMENT PRIMARY KEY,
            chatname VARCHAR(255),
            isgroupchat BOOLEAN NOT NULL DEFAULT FALSE,
            latestmessage INT NULL,
            groupadmin INT NULL,
            FOREIGN KEY (groupadmin) REFERENCES users(id) ON DELETE SET NULL
        )
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating chats table:", err);
        } else {
            console.log(`Table 'chats' created successfully.`);
        }
    });
};

module.exports = createChatsModel;
