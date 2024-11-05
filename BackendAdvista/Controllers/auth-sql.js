// const mysql=require('mysql')
// const util = require('util');
// const dotenv = require("dotenv");
// const jwt=require('jsonwebtoken')
// // const query = require('../db/query'); // Assuming you have a helper for SQL queries
// const passport = require('passport');
// dotenv.config({});
// const bcrypt = require('bcrypt');
// const { oauth2client } = require('../utils/GoogleConfig');
// const axios = require('axios');

// const saltRounds = 10;

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: process.env.SQL_PASSWORD, 
//     database: "advista"
//   });


// const query = util.promisify(db.query).bind(db);

// // const APP_ID = process.env.Facebook_APP_ID;
// // const APP_SECRET = process.env.Facebook_APP_SECRET;
// // const REDIRECT_URI =process.env.REDIRECT_URI ;

// const facebookLogin =(req, res) => {
//     // const accessToken = req.body.accessToken;
  
//     passport.authenticate('facebook',  {
//      scope:['public_profile','email']
//     });
//   };

// const facebookCallback = (req, res, next) => {
//     passport.authenticate('facebook', {
//         failureRedirect: '/login-failed',
//         successRedirect: '/'
//     })(req, res, next);
// };
// const user =()=>{
    
// }
// const register = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // SQL queries
//         const sqlCheck = 'SELECT * FROM clients WHERE email = ?';
//         const sqlUpdate = 'UPDATE clients SET passwords = ?, auth_provider = ? WHERE email = ?';
//         const sqlInsert = 'INSERT INTO clients (email, passwords, auth_provider) VALUES (?, ?, ?)';
//         const sqlGetClient = 'SELECT Client_ID, email, isAdmin FROM clients WHERE Client_ID = LAST_INSERT_ID()';
//         const sqlGetClientviaEMail = 'SELECT Client_ID, email, isAdmin FROM clients WHERE email =?';

//         // Check if the email already exists
//         const user = await query(sqlCheck, [email]);

//         if (user.length > 0) {
//             if (user[0].auth_provider !== 'email') {
//                 // If the user previously signed up via Google/Facebook, allow setting a password
//                 const hashedPassword = await bcrypt.hash(password, 10);
//                 await query(sqlUpdate, [hashedPassword, 'email', email]); // Update the auth_provider to 'email'

//                 // Retrieve the updated user details via email
//                 const clientData = await query(sqlGetClientviaEMail, [email]);

//                 if (clientData.length > 0) {
//                     const { Client_ID, email, isAdmin } = clientData[0];

//                     // Create a JWT token for the user
//                     const token = jwt.sign({
//                         userId: Client_ID,
//                         email: email,
//                         isAdmin: isAdmin,
//                     },
//                     process.env.JWT_SECRET_KEY, {
//                         expiresIn: process.env.JWT_TIMEOUT || '1h' // Default token expiration time is 1 hour
//                     });

//                     // Return success response with the token and user details
//                     return res.status(201).json({
//                         msg: 'Account updated with password successfully',
//                         success: true,
//                         token: token,
//                         userID: Client_ID,
//                     });
//                 }
//             } else {
//                 // If the user already registered with email/password, do not allow another registration
//                 return res.status(400).json({ error: 'You already have an account with this email. Please log in.' });
//             }
//         } else {
//             // Hash the password and insert a new user for email registration
//             const hashedPassword = await bcrypt.hash(password, 10);
//             await query(sqlInsert, [email, hashedPassword, 'email']);

//             // Retrieve the newly inserted user's details
//             const clientData = await query(sqlGetClient);

//             if (clientData.length > 0) {
//                 const { Client_ID, email, isAdmin } = clientData[0];

//                 // Create a JWT token for the user
//                 const token = jwt.sign({
//                     userId: Client_ID,
//                     email: email,
//                     isAdmin: isAdmin,
//                 },
//                 process.env.JWT_SECRET_KEY, {
//                     expiresIn: process.env.JWT_TIMEOUT || '1h' // Default token expiration time is 1 hour
//                 });

//                 // Return success response with the token and user details
//                 return res.status(201).json({
//                     msg: 'Registration successful',
//                     success: true,
//                     token: token,
//                     userID: Client_ID,
//                 });
//             } else {
//                 return res.status(500).json({ error: 'Registration succeeded, but failed to retrieve user details.' });
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };



// const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const sqlCheck = 'SELECT * FROM clients WHERE email = ?';
//         const user = await query(sqlCheck, [email]);

//         if (user.length === 0) {
//             return res.status(400).json({ error: 'Email does not exist. Please sign up.' });
//         }

//         // Check if the user signed up with email/password
//         if (user[0].auth_provider !== 'email') {
//             return res.status(400).json({ error: `This email is registered using ${user[0].auth_provider}. Please use ${user[0].auth_provider} to log in.` });
//         }

//         // Validate the password
//         const isPasswordValid = await bcrypt.compare(password, user[0].passwords);

//         if (isPasswordValid) {
//             // Generate JWT token upon successful login
//             const token = jwt.sign(
//                 {
//                     userId: user[0].Client_ID,
//                     email: user[0].email,
//                     isAdmin: user[0].isAdmin,
//                 },
//                 process.env.JWT_SECRET_KEY,
//                 { expiresIn: process.env.JWT_TIMEOUT || '1h' }
//             );

//             return res.status(200).json({
//                 success: true,
//                 message: 'Login successful',
//                 token: token,
//                 user: {
//                     userId: user[0].Client_ID,
//                     email: user[0].email,
//                     isAdmin: user[0].isAdmin,
//                 },
//             });
//         } else {
//             return res.status(400).json({ error: 'Incorrect password' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


// const googleLogin = async (req, res) => {
//     try {
//         const { code } = req.query;

//         if (!code) {
//             return res.status(400).json({ message: 'Authorization code missing' });
//         }

//         // Exchange code for tokens
//         const { tokens } = await oauth2client.getToken(code);
//         oauth2client.setCredentials(tokens);
        
//         // Retrieve user info from Google using the access token
//         const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
//         console.log("USer info: ",userRes.data);
        
//         const {id, email, name, picture } = userRes.data;

//         // const Adinfo=await axios.get(`https://googleads.googleapis.com/v18/customers/${id}/googleAds:searchStream`)
//         // console.log(Adinfo);
        
//         const sqlCheck = 'SELECT * FROM clients WHERE email = ?';
//         let user = await query(sqlCheck, [email]);

//         let clientData;

//         if (user.length === 0) {
//             // Insert new user for Google login
//             const sqlInsert = 'INSERT INTO clients (email, auth_provider) VALUES (?, ?)';
//             await query(sqlInsert, [email, 'google']);

//             const sqlGetClient = 'SELECT Client_ID, email, isAdmin FROM clients WHERE Client_ID = LAST_INSERT_ID()';
//             clientData = await query(sqlGetClient);
//         } else if (user[0].auth_provider === 'email') {
//             // User registered via email, now trying to log in with Google
//             // Update auth_provider to 'google'
//             const sqlUpdate = 'UPDATE clients SET auth_provider = ? WHERE email = ?';
//             await query(sqlUpdate, ['google', email]);

//             // Retrieve updated user data
//             const sqlGetClient = 'SELECT Client_ID, email, isAdmin FROM clients WHERE email = ?';
//             clientData = await query(sqlGetClient, [email]);
//         } else {
//             // User already logged in with Google before, fetch their details
//             const sqlGetClient = 'SELECT Client_ID, email, isAdmin FROM clients WHERE email = ?';
//             clientData = await query(sqlGetClient, [email]);
//         }

//         if (clientData.length > 0) {
//             const { Client_ID, email, isAdmin } = clientData[0];

//             // Create a JWT token for the user
//             const token = jwt.sign({
//                 userId: Client_ID,
//                 email: email,
//                 isAdmin: isAdmin,
//             },
//             process.env.JWT_SECRET_KEY, {
//                 expiresIn: process.env.JWT_TIMEOUT || '1h',
//             });

//             // Return success response with the token and user details
//             return res.status(200).json({
//                 msg: 'Login successful',
//                 success: true,
//                 token: token,
//                 userID: Client_ID,
//             });
//         } else {
//             return res.status(500).json({ error: 'Login succeeded, but failed to retrieve user details' });
//         }
//     } catch (error) {
//         console.error('Google login error:', error);
//         return res.status(500).json({
//             message: 'Internal Server Error',
//         });
//     }
// };

// module.exports={
//     register,
//     login,
//     googleLogin,
//     facebookLogin,
//     facebookCallback ,
//     user
// }
