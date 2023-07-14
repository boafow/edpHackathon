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

const credentialsSchema = new mongoose.Schema({
    _id: Number,
    employeeId: String,
    password: String,
    role: String
}
);

const Employees = mongoose.model('employees', employeesSchema);
const Credentials = mongoose.model('credentials', credentialsSchema);

module.exports = {
    Employees, Credentials
} 
