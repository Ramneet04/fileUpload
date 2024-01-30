const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

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
    } catch (error) {
        console.log("NODEMAILER ERROR -> ", error);
    }
})

module.exports = mongoose.model("File", fileSchema);