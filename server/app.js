import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import MessageRouter from "./router/MessageRouter.js";
import { errorMiddlewere } from './middlewere/errorMiddlewere.js';
import UserRouter from './router/UserRouter.js';
import AppointmentRouter from './router/AppointmentRouter.js';
import morgan from 'morgan';
 
const app = express();
config({ path: "./config/config.env" })

app.use(
    cors({
        origin: [process.env.REACT_APP_URL, process.env.DASHBOARD_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
)

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use("/api/v1/message", MessageRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/appointment", AppointmentRouter);
dbConnection();

app.use(errorMiddlewere);

export default app;