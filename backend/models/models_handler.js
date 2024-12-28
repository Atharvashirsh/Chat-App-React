const createUsersModel = require("../models/users");
const createChatsModel = require("../models/chats");
const createMessagesModel = require("../models/message");
const createMessageReadByModel = require("../models/message_read_by");
const createChatUsersModel = require("../models/chat_users");
const conn = require("../connection/db_conn");

const addForeignKeys = async () => {
    try {
        const checkSql = `
            SELECT CONSTRAINT_NAME 
            FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
            WHERE TABLE_NAME = 'chats' 
            AND CONSTRAINT_NAME = 'fk_messages';
        `;

        const [rows] = await conn.promise().query(checkSql);

        if (rows.length === 0) {
            const sql = `
                ALTER TABLE chats 
                ADD CONSTRAINT fk_messages
                FOREIGN KEY (latestmessage) REFERENCES messages(id) ON DELETE SET NULL;
            `;
            await conn.promise().query(sql);
            console.log("Foreign key constraint 'fk_messages' added successfully.");
        } else {
            console.log("Foreign key constraint 'fk_messages' already exists.");
        }
    } catch (err) {
        console.error("Error adding foreign key constraint:", err.message);
    }
};

const createTables = () => {
    createUsersModel();
    createChatsModel();
    createMessagesModel();
    createChatUsersModel();
    createMessageReadByModel();
    addForeignKeys();
};

module.exports = createTables;
