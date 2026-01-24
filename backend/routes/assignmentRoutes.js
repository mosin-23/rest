const express = require("express");
const router = express.Router();

const {
  createAssignment,
  submitAssignment
} = require("../Controller/assignmentController");

router.post("/", createAssignment);                       // create assignment
router.post("/:assignmentId/submit", submitAssignment);  // submit assignment

module.exports = router;
