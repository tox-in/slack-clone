const express = require("express");
const {login, signup, signupInOrganization} = require("../Controllers/AuthController");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(signup);
router.route("/joinOrganization").post(signupInOrganization);

module.exports = router;