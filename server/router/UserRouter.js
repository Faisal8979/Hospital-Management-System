import express from 'express';
import {
    addNewAdminController,
    addNewDoctorController,
    getAllDoctorsController,
    getUserDetailsController,
    loginController,
    logoutAdminController,
    logoutPatientController,
    patientRegisterController
} from '../controller/userController.js';
import {isAdminAuthenticated, isPatientAuthenticated } from '../middlewere/auth.js';

const router = express.Router();

router.post("/register", patientRegisterController);

router.post("/login", loginController);

router.post("/admin/add-new", isAdminAuthenticated, addNewAdminController);

router.get("/doctors", getAllDoctorsController);

router.get("/admin/me", isAdminAuthenticated, getUserDetailsController)

router.get("/patient/me", isPatientAuthenticated, getUserDetails);

router.get("/admin/logout", isAdminAuthenticated, logoutAdminController);

router.get("/patient/logout", isPatientAuthenticated, logoutPatientController);

router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctorController)

export default router;