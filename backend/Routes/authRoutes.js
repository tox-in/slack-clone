const express = require("express");
const {login, signup} = require("../Controllers/AuthController");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(signup);

module.exports = router;