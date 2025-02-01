const express=require('express');
const router=express.Router();

const roleController=require('../controller/roleController');


router.post("/createuser",roleController.createuser);
router.post("/login", roleController.loginuser,);
router.get("/read", roleController.getusers);

router.put("/update/:id", 
    roleController.verifyAdmin,
    roleController.updateuser);
router.delete("/delete/:id",roleController.deleteuser);


 // roleController.verifyAdmin,





router.post("/vscode/org/createadmin",roleController.createAdmin);

module.exports=router;