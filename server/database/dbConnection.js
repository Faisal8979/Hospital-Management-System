import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
        console.log("Connected To Database");
    })
        .catch((error) => {
        console.log(`Some Error Occured While Connecting To Database : ${error}`);
        
    })
}