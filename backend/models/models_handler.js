const createUsersModel = require("../models/users");
const createChatsModel = require("../models/chats");
const createMessagesModel = require("../models/message");
const createMessageReadByModel = require("../models/message_read_by");
const createChatUsersModel = require("../models/chat_users");

const addForeignKeys = () => {
    const sql = `
        ALTER TABLE chats 
        ADD CONSTRAINT fk_messages
        FOREIGN KEY (latestmessage) REFERENCES messages(id) ON DELETE SET NULL,
    `;
};

const createTables = () => {
    createUsersModel();
    createChatsModel();
    createMessagesModel();
    createChatUsersModel();
    createMessageReadByModel();
    addForeignKeys();
    console.log("Tables created successfully");
};

module.exports = createTables;
