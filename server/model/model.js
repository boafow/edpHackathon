const mongoose = require('mongoose');

const employeesSchema = new mongoose.Schema({

    _id: Number,
    name: String,
    phone: String,
    salary: String,
    role: String,
    location: String,
    employeeId: String,
    managerId: String
}
);

const Employees = mongoose.model('employees', employeesSchema);

module.exports = {
    Employees
} 
