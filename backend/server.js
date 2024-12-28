const userRoutes = require("./user/userRouter");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const createTables = require("./models/models_handler");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

createTables();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
