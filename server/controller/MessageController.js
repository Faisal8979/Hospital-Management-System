import { Message } from "../models/messageSchema.js";
import { catchAsyncErrors } from "../middlewere/catchAsyncErrors.js";
import ErrorHandler from '../middlewere/errorMiddlewere.js';


export const sendMessageController = catchAsyncErrors(
    async (req, res, next) => {
      const { firstName, lastName, email, phone, message } = req.body;
        if (!firstName || !lastName || !email || !phone || !message) {
            return next(new ErrorHandler("Please Fill Full Form!", 400))
        }
        await Message.create({
            firstName,
            lastName,
            email,
            phone,
            message
        });
        res.status(200).send({
            success: true,
            message:"Message Send Successfully"
      })
}
)

export const getAllMessage = catchAsyncErrors(async(req, res, next) => {
    const messages = await Message.find();
    res.status(200).send({
        success: true,
        messages,
    })
})