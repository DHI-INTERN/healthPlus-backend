const express = require("express");
const { signin, logout } = require("../controllers/auth");
var router = express.Router();
const { check } = require("express-validator");

router.post(
  "/signin",
  [
    check("username").isLength({ min: 2 }).withMessage("username is required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("password field is required"),
  ],
  signin
);

router.get("api/logout", logout);

module.exports = router;
