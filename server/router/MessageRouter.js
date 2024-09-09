import express from "express";
import { getAllMessage, sendMessageController } from "../controller/messageController.js";
import {isAdminAuthenticated } from '../middlewere/auth.js';
const router = express.Router();


router.post("/send", sendMessageController);

router.get("/getallmessages", isAdminAuthenticated, getAllMessage)


export default router;