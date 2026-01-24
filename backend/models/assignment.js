const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  dueDate: Date,
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    submittedAt: Date,
    fileUrl: String
  }]
});

module.exports = mongoose.model("Assignment", assignmentSchema);
