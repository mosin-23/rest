const bcrypt = require("bcryptjs");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const generateRollNo = require("../utils/generateRollNo");
/* ================= REGISTER STUDENT ================= */
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, department, currentYear, address } = req.body;

    // Validate required fields
    if (!name || !email || !password || !department || !currentYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if student already exists
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-generate roll number
    const rollNo = await generateRollNo(currentYear);

    // Create student (address is optional)
    const student = await Student.create({
      rollNo,
      name,
      email,
      password: hashedPassword,
      department,
      currentYear,
      address   // 👈 added safely
    });

    res.status(201).json({
      message: "Student registered successfully",
      rollNo,
      student: {
        _id: student._id,
        rollNo: student.rollNo,
        name: student.name,
        email: student.email,
        department: student.department,
        address: student.address || null
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* ================= LOGIN ================= */
exports.loginStudent = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const Model = role === "student" ? Student : Teacher;

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      role,
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};