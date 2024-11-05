const express = require("express")
const passport = require("passport");
const router=express.Router();


const {register,login, googleLogin,user,facebookLogin,facebookCallback} =require("../Controllers/auth")
const authmiddleware=require("../Middlewares/AuthMiddleware")
router.post("/register",register);
router.post("/login",login);
router.get("/google",googleLogin);
router.get("/user",authmiddleware,user);
router.get('/facebook',facebookLogin);
router.get('/facebook/callback',facebookCallback)
// router.get("/facebook/callback",FacebookLogincallback);


module.exports=router