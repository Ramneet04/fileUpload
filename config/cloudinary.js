const cloudinary = require('cloudinary').v2

require("dotenv").config();

const Cloudinary=()=>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLODINARY_API_KEY,
            api_secret: process.env.CLODINARY_API_SECRET
        }) //may be this can occur some error
    } catch (error) {
        console.log("ERROR IN CLOUDINARY: ",error);
    }
}
module.exports = Cloudinary;