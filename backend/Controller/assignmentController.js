const Assignment = require("../models/assignment");
const Course = require("../models/course");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
/* ================= CREATE ASSIGNMENT ================= */
exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseCode, teacherEmpId } = req.body;

    // find course using courseCode
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // find teacher using empId
    const teacher = await Teacher.findOne({ empId: teacherEmpId });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course: course._id,
      teacher: teacher._id
    });

    res.status(201).json({
      message: "Assignment created successfully",
      assignment
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/* ================= SUBMIT ASSIGNMENT (USING COURSE CODE) ================= */
exports.submitAssignment = async (req, res) => {
  try {
    const { courseCode, rollNo, fileUrl } = req.body;

    // Find course by courseCode
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Find assignment for this course
    const assignment = await Assignment.findOne({ course: course._id });
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found for this course" });
    }

    // Find student by rollNo
    const student = await Student.findOne({ rollNo });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if student is registered in the course
    if (!course.students.includes(student._id)) {
      return res.status(403).json({ error: "Student is not registered for this course" });
    }

    // Prevent duplicate submission
    const alreadySubmitted = assignment.submissions.some(
      sub => sub.student.toString() === student._id.toString()
    );

    if (alreadySubmitted) {
      return res.status(400).json({ error: "Assignment already submitted" });
    }

    // Submit assignment
    assignment.submissions.push({
      student: student._id,
      submittedAt: new Date(),
      fileUrl
    });

    await assignment.save();

    res.json({ message: "Assignment submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/* ================= GET ASSIGNMENTS WITH SUBMISSIONS ================= */
exports.getAllAssignmentsWithSubmissions = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("course")
      .populate("submissions.student", "name rollNo");

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
