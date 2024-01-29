const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload} = require("../controllers/fileUpload");

router.post("/localfileupload", localFileUpload);
router.post("/imageUpload", imageUpload);

module.exports = router;
