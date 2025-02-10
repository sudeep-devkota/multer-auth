const multer = require("multer");

const path = require("path");
const fs = require("fs");

const userimage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/user");
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname);
    }
});
exports.uploadprofile = multer({storage:userimage}).single("user");


const  adminimage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads/admin");
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + "-" + file.originalname);
    }
});
exports.uploadadminprofile = multer({storage:adminimage}).single("admin");



