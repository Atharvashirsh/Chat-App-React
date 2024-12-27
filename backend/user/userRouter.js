const express = require("express");
const router = express.Router();
const UserController = require("./controllers/controllerHandler");

router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);

module.exports = router;
