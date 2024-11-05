const mysql=require('mysql')
const User=require('../Models/usermodel')
const util = require('util');
const dotenv = require("dotenv");
const jwt=require('jsonwebtoken')
// const query = require('../db/query'); // Assuming you have a helper for SQL queries
const passport = require('passport');
dotenv.config({});
const bcrypt = require('bcrypt');
const { oauth2client } = require('../utils/GoogleConfig');
const axios = require('axios');



// const APP_ID = process.env.Facebook_APP_ID;
// const APP_SECRET = process.env.Facebook_APP_SECRET;
// const REDIRECT_URI =process.env.REDIRECT_URI ;

const facebookLogin =(req, res) => {
    // const accessToken = req.body.accessToken;
  
    passport.authenticate('facebook',  {
     scope:['public_profile','email']
    });
};

const facebookCallback = (req, res, next) => {
    passport.authenticate('facebook', {
        failureRedirect: '/login-failed',
        successRedirect: '/'
    })(req, res, next);
};
const user =(req,res)=>{
    try {
        const userdata = req.user;
        // if(userData.email=="kedardhule14@gmail.com"){
        //     userData.isAdmin=true;
        // }
        // console.log("controleer ",userdata);
        return res.status(200).json({  userdata });        // res.status(200).json({msg:"in user"})        
    } catch (error) {
        console.log(`Error form user route ${error}`);
    }
}
const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // SQL queries
      
        // Check if the email already exists
        const user = await User.findOne({email});

        if (user) {
            if (user.auth_provider !== 'email') {
                // If the user signed up via Google/Facebook, allow them to set a password and switch to 'email' login
                user.password = password; // This will trigger password hashing via the pre-save middleware
                user.auth_provider = 'email'; // Change auth provider to email
                console.log(password);
                
                // Save the updated user details
                await user.save();

                // Generate a JWT token for the user
                const token = user.generateToken();

                return res.status(201).json({
                    msg: 'Account updated with password successfully',
                    success: true,
                    token,
                    userID: user._id,
                });
            } else {
                // If the user already registered with email/password, prevent re-registration
                return res.status(400).json({ error: 'You already have an account with this email. Please log in.' });
            }
        } else {
            // No user found, so create a new user and hash the password
            const newUser = new User({
                email,
                password, // This will be hashed automatically by the pre-save hook
                auth_provider: 'email',
            });

            // Save the new user to the database
            await newUser.save();

            // Generate a JWT token for the new user
            // const token = newUser.generateToken();

            return res.status(201).json({
                msg: 'Registration successful',
                success: true,
                token:await newUser.generateToken(),
                userID: newUser._id,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ error: 'Email does not exist. Please sign up.' });
        }

        // Check if the user signed up with email/password
        if (user.auth_provider !== 'email') {
            return res.status(400).json({ error: `This email is registered using ${user[0].auth_provider}. Please use ${user[0].auth_provider} to log in.` });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // Generate JWT token upon successful login
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                token: await user.generateToken(),
                userId: user.toString(),
            });
        } else {
            return res.status(400).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ message: 'Authorization code missing' });
        }

        // Exchange code for tokens
        const { tokens } = await oauth2client.getToken(code);
        oauth2client.setCredentials(tokens);
        
        // Retrieve user info from Google using the access token
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
        console.log("USer info: ",userRes.data);
        
        const {id, email, name, picture } = userRes.data;

        // const Adinfo=await axios.get(`https://googleads.googleapis.com/v18/customers/${id}/googleAds:searchStream`)
        // console.log(Adinfo);
      
        let user = await User.findOne({email});

        let clientData;

        if (!user) {
            // User does not exist, so insert new user with Google login
            const newUser = new User({
                email,
                auth_provider: 'google', // Set auth_provider as 'google' for social login
            });

            // Save the new user to the database
            await newUser.save();

   

            return res.status(201).json({
                msg: 'Registration successful with Google login',
                success: true,
                token:await newUser.generateToken(),
                userID: newUser._id,
            });

        } else if (user.auth_provider === 'email') {
            // User registered via email, now trying to log in with Google
            // Update the auth_provider to 'google'
            user.auth_provider = 'google';

            // Save the updated user information
            await user.save();

            

            return res.status(200).json({
                msg: 'Login successful with Google, account updated',
                success: true,
                token:await user.generateToken(),
                userID: user._id,
            });

        } else {
            // User already logged in with Google before, return their details
            // Generate a JWT token for the user
            // const token = user.generateToken();

            return res.status(200).json({
                msg: 'Login successful with Google',
                success: true,
                token:await user.generateToken(),
                userID: user._id,
            });
        }

       
    } catch (error) {
        console.error('Google login error:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

module.exports={
    register,
    login,
    googleLogin,
    facebookLogin,
    facebookCallback ,
    user
}
