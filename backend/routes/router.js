const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
    response.send("request fetched");
});

module.exports = router;