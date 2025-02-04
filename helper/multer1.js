const multer = require("multer");

const path = require("path");
const fs = require("fs");

const userimage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads");
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname);
    }
});
exports.uploadprofile = multer({storage:userimage}).single("uploads");



