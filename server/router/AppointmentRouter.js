import express from 'express';
import { deleteAppointment, getAllAppointment, postAppointment, updateAppointment } from '../controller/appointmentController.js';
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewere/auth.js"

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);

router.get("/getallappointment", isAdminAuthenticated, getAllAppointment);

router.put("/update/:id", isAdminAuthenticated, updateAppointment);

router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;