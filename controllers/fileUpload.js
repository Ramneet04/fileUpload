const File = require("../models/file");
const cloudinary = require("cloudinary").v2;
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

function isSupported(supportedTypes, fileType){
    if(supportedTypes.includes(fileType)){
        return true;
    }
    return false;
}
async function uploadFileToCloudinary(file,folder){
    const options = {folder};
    console.log(file.tempFilePath)
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error; // rethrow the error if needed
    }
}
exports.imageUpload = async (req,res)=>{
    try {
        const {name, tags, email} = req.body;
        console.log(name,tags,email);
        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType= file.name.split(".")[1].toLowerCase();
        if(!isSupported(supportedTypes,fileType)){
            return res.status(400).json({
                success:false,
                message: "File type not supported",
            });
        }
        else{
            console.log("SUPPORTED -> ",fileType);
        }

        const response = await uploadFileToCloudinary(file, "fileUpload");
        console.log(response);
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully Uploaded",
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}