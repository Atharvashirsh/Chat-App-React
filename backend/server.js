const userRoutes = require("./user/userRouter");
const dotenv = require("dotenv");
const express = require("express");

const createTables = require("./models/models_handler");
createTables();

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
