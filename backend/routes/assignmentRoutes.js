const express = require("express");
const router = express.Router();

const {
  createAssignment,
  submitAssignment,
  getAllAssignmentsWithSubmissions,
  getAssignmentsByStudentRollNo
} = require("../Controller/assignmentController");

router.post("/", createAssignment);                       // create assignment
router.post("/submit", submitAssignment);  // submit assignment
router.get("/student/:id", getAssignmentsByStudentRollNo);
router.get("/submissions", getAllAssignmentsWithSubmissions);
module.exports = router;
