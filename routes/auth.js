const express=require("express");
const router=express.Router();

const authControllers=require("../controllers/auth");

router.route("/register").post(authControllers.registerController);
router.route("/login").post(authControllers.loginController);

module.exports=router;