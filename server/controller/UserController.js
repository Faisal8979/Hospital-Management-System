import { catchAsyncErrors } from '../middlewere/catchAsyncErrors.js';
import ErrorHandler from '../middlewere/errorMiddlewere.js';
import { User } from '../models/UserSchema.js';
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from 'cloudinary';

export const patientRegisterController = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !role
    ){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
         return next(new ErrorHandler("User Already Register", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role
    })
    generateToken(user, "User Register Successfully", 200, res);
    // res.status(200).send({
    //     success: true,
    //     message: "User Register Successfully"
    // })
})

export const loginController = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details", 400))
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password And Confirm Password Do Not Match"))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password Or Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password Or Email", 400))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found", 400))
    }
    generateToken(user, "User Logged In Successfully", 200, res);
    //   res.status(200).send({
    //     success: true,
    //     message: "User Logged In Successfully"
    // })
})

export const addNewAdminController = catchAsyncErrors(async (req, res, next) => {
        const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password 
    ){
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists`))
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Admin"
    })
    res.status(200).send({
        success: true,
        message: "New Admin Registered",
        admin
    })
})

export const getAllDoctorsController = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).send({
        success: true,
        doctors
    })
});

export const getUserDetailsController = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).send({
        success: true,
        user
    })
})

export const logoutAdminController = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("adminToken", " ", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .send({
        success: true,
        message:"Admin Logged Out Successfully!"
    })
})

export const logoutPatientController = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("patientToken", " ", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .send({
            success: true,
            message: "Patient Logged Out Successfully!"
        })
});

export const addNewDoctorController = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avtar Required", 400))
    }
    const { docAvtar } = req.files;
    const allowFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowFormats.includes(docAvtar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400))
    }
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !doctorDepartment
    ) {
        return next(new ErrorHandler("Please Provide All Fields", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(
            new ErrorHandler(
                `${isRegistered.role} Already Register With This Email`,
                400
            )
        )
    }
 const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvtar.tempFilePath
);
if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
        "Cloudinary Error:",
        cloudinaryResponse.error || "Unknown Cloudinary Error"
    )
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
        role: "Doctor",
        docAvtar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });
    res.status(200).send({
        success: true,
        message: "New Doctor Registered",
        doctor,
    })
});


