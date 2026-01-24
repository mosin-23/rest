const express = require("express");
const router = express.Router();

const { registerStudent, loginStudent } = require("../Controller/authController");

router.post("/register", registerStudent);  // register student
router.post("/login", loginStudent);        // login student/teacher

module.exports = router;