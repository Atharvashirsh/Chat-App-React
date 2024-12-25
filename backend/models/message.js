const conn = require("../connection/db_conn");

const createMessagesModel = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS messages (
            id INT AUTO_INCREMENT PRIMARY KEY,
            sender INT NOT NULL,
            content TEXT NOT NULL,
            chat INT NOT NULL,
            FOREIGN KEY (sender) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (chat) REFERENCES chats(id) ON DELETE CASCADE
        )
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating messages table:", err);
        } else {
            console.log("Table 'messages' created successfully.");
        }
    });
};

module.exports = createMessagesModel;
