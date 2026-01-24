const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// 🔐 AUTH ROUTES (ADD THIS)
app.use("/api/auth", require("./routes/authRoutes"));

// CORE MODULE ROUTES
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/assignments", require("./routes/assignmentRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/timetable", require("./routes/timetableRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
