const express = require("express");
const app= express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cloudinary = require("cloudinary");

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:  "/tmp/"
}));

const dbConnect = require("./config/database");
dbConnect();
const Cloudinary = require("./config/cloudinary");
Cloudinary();
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLODINARY_API_KEY,
//     api_secret: process.env.CLODINARY_API_SECRET
// })

const Upload = require("./routes/fileupload");
app.use("/api/v1/upload",Upload);

app.listen(PORT,()=>{
    console.log("running");
})
app.get("/",(req,res)=>{
    res.send("<h1>HELLO!!!</h1>");
})