import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Content At Least 3 Characters"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits"],
    },
     nic: {
        type: String,
        required: true,
         minLength: [5, "NIC  Must Contain Exact 5 Digits"],
         maxLength: [5, "NIC  Must Contain Exact 5 Digits"],
    },
    dob: {
        type: Date,
        required: [true, "Date Of Birth Is Required"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Others"]
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password Must Contain At Least 8 Characters"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"]
    },
    doctorDepartment: {
        type: String, 
    },
    docAvtar: {
        public_id: String,
        url:String,
    }
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})
UserSchema.methods.comparePassword = async function (enterdPassword) {
   return await bcrypt.compare(enterdPassword, this.password)
};


UserSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

export const User = mongoose.model("User", UserSchema);