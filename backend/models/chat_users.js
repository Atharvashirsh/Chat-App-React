const conn = require("../connection/db_conn");

const createChatUsersModel = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS chat_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            chat_id INT NOT NULL, -- Refers to the chat ID
            user_id INT NOT NULL, -- Refers to the user ID
            FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating chat_users table:", err);
        } else {
            console.log("Table 'chat_users' created successfully.");
        }
    });
};

module.exports = createChatUsersModel;
