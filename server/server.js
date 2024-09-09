import app from "./index.js";
const port = process.env.PORT || 8000;
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.listen(port, () => {
    console.log(`Server Run Port Number ${port}`);
    
})
