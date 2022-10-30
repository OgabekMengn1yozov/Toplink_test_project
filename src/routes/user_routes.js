const resetPassword = require("../controllers/reset-password/reset-password");
const resetPasswordSendCode = require("../controllers/reset-password/reset-password-send-code");
const resetPasswordVerify = require("../controllers/reset-password/reset-password-verify");
const { SignUp, Login } = require("../controllers/user_controllers");

const router = require("express").Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/reset", resetPasswordSendCode);
router.post("/verify", resetPasswordVerify);
router.post("/newpass", resetPassword);

module.exports = {
  path: "/api",
  router,
};
