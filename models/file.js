const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
});

fileSchema.post("save", async function(doc){
    try {
        console.log("DOC ->",doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
        let info = await transporter.sendMail({
            from:  "no-reply@imageuploader.com",
            to:  doc.email,
            subject: `Your Image has been uploaded`,
            html: `<h2>Hello !!!</h2><p>We have Uploaded your file</p> <hr> <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        });
        console.log("Mail -> ",info);
    } catch (error) {
        console.log("NODEMAILER ERROR -> ", error);
    }
})

module.exports = mongoose.model("File", fileSchema);