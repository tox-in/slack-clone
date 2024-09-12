const express = require("express");
const {login, signup, signupInOrganization, joinOrganization} = require("../Controllers/AuthController");

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(signup);
router.route("/SignupAndJoinOrganization").post(signupInOrganization);
router.route("/joinOrganization").post(joinOrganization);


module.exports = router;