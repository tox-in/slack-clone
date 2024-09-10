const express = require("express");
const {createOrganization} = require("../Controllers/OrganizationController.js");
const { ProtectMiddleware } = require("../middleware/ProtectMiddleware.js");

const router = express.Router();

router.route("/register", ProtectMiddleware).post(createOrganization);

module.exports = router;