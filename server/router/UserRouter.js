import express from 'express';
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from '../controller/UserController.js';
import {isAdminAuthenticated, isPatientAuthenticated } from '../middlewere/auth.js';

const router = express.Router();

router.post("/register", patientRegister);

router.post("/login", login);

router.post("/admin/add-new", isAdminAuthenticated, addNewAdmin);

router.get("/doctors", getAllDoctors);

router.get("/admin/me", isAdminAuthenticated, getUserDetails)

router.get("/patient/me", isPatientAuthenticated, getUserDetails);

router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor)

export default router;