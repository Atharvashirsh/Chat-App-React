const appRoutes = require("./routes/router");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
const app = express();

app.use("/api", appRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
