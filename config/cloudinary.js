const cloudinary = require('cloudinary').v2

require("dotenv").config();

exports.cloudinary=()=>{
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLODINARY_API_KEY,
            api_secret: process.env.CLODINARY_API_SECRET
        }) //may be this can occur some error
        .then(()=>{
            console.log("db cloudinary successful");
        })
    } catch (error) {
        console.log("ERROR IN CLOUDINARY: ",error);
    }
}