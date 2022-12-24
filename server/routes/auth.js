const express = require("express");
const router = express.Router();

const signupController = require("../controllers/auth/signupController");
const loginController = require("../controllers/auth/loginController");

router.post("/signup", signupController.handleSignupNewUser);
router.post("/login", loginController.handleLogin);

module.exports = router;
