const File = require("../models/file");
// localfileupload -> handler function

exports.localFileUpload = async (req,res)=>{
    try {
        const file = req.files.file;
        console.log("FILE :",file);
        let path= __dirname + "/files/"+ Date.now() + "." + `${file.name.split(".")[1]}`;
        console.log("PATH :",path);

        file.mv(path, (err)=>{
            console.log("ERROR IN MOVING FILE :",err);
        })

        res.json({
            status: "OK",
            message: "local file uploaded successfully",
        })
    } catch (error) {
        res.json({
            status:"Error",
            message: error.message,
        })
    }
}