const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userInfo,
  userLogout
} = require("../controllers/users.controller.js");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", userInfo);
router.get("/logout", userLogout);

module.exports = router;
