const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  role: {
    type: String,
    enum: ["Team Leader", "Developer","CEO","COO","Intern","Jr Developer","Intern","HR","Project Manager"],
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Employee = new mongoose.model("Employee", employeeSchema);

module.exports = Employee;
