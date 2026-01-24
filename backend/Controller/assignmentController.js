const Assignment = require("../models/assignment");

/* ================= CREATE ASSIGNMENT ================= */
exports.createAssignment = async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.status(201).json(assignment);
};

/* ================= SUBMIT ASSIGNMENT ================= */
exports.submitAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const { student, fileUrl } = req.body;

  await Assignment.findByIdAndUpdate(assignmentId, {
    $push: {
      submissions: {
        student,
        submittedAt: new Date(),
        fileUrl
      }
    }
  });

  res.json({ message: "Assignment submitted" });
};
