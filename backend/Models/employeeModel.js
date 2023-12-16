const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        required : [true, "An user must have an email."],
        unique : true
    },
    password : {
        type: String
    },
    otp: {
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    role:{
        type: String,
        default: 'agent'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verification_otp: {
        type: String,
    },
    salary: {
        type: Number,
        default:0,
        validate: {
            validator: function(value) {
                
                return value >= 0; // Ensuring the salary is non-negative
            },
            message: props => `${props.value} is not a valid salary. Salary must be a non-negative number.`
        }
    }
});

module.exports = mongoose.model('employees', employeeSchema);