const conn = require("../connection/db_conn");

const createMessageReadByModel = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS message_read_by (
            id INT AUTO_INCREMENT PRIMARY KEY,
            message_id INT NOT NULL, -- Refers to the message ID
            user_id INT NOT NULL, -- Refers to the user ID
            FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error("Error creating message_read_by table:", err);
        } else {
            console.log("Table 'message_read_by' created successfully.");
        }
    });
};

module.exports = createMessageReadByModel;
