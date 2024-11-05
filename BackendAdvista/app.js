const express = require("express");
const dotenv = require("dotenv");

const cors = require("cors");
const path = require("path");

dotenv.config({});
const connectDB=require('./utils/db')
connectDB();

const session = require('express-session');

const passport=require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const app = express();
const IndexRoute = require("./Routers/index");
const config=require('./utils/FacebookConfig')


app.use(session({
  secret: process.env.Advista_SESSION_KEY,  // A secret key used to sign the session ID cookie
  resave: false,              // Forces session to be saved back to the session store, even if it wasn’t modified
  saveUninitialized: true,    // Forces a session that is uninitialized to be saved to the store   // Set to true if using HTTPS
}));

// const facebookconfig=require("./utils/FacebookConfig")
app.use(passport.initialize());
app.use(passport.session());




passport.serializeUser(function(user,cb){//cb=callback, this methid will run automatically after login
  cb(null,user);
});

passport.deserializeUser(function(obj,cb){//When user refresh the web it will run
  cb(null,obj);
});


passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.Facebook_APP_ID,
      clientSecret: process.env.Facebook_APP_SECRET,
      callbackURL: process.env.REDIRECT_URI,  
      // profileFields: ['id', 'emails', 'name']
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('Facebook profile:', profile);
      // Save user to database (optional)
      return done(null, profile);
    }
  )
);

app.use(express.json());
app.use(cors(
  {
    origin:"https://advista.vercel.app",
    methods:"GET,POST,PATCH,PUT,DELETE",
    Credentials:true,
  }
));
const allowedOrigins = ['https://advista.vercel.app']; // Adjust for production

const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow cookies for authenticated requests
  optionsSuccessStatus: 200, // HTTP status code for preflight requests
};

app.use(cors(corsOptions));
app.use(cors());
app.use("/api", IndexRoute );

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Example app listening on http://localhost:${PORT}`);
  });

  // const OpenAI = require('openai');  // Directly import the OpenAI class

// Create a new OpenAI instance with the API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,  // Ensure your API key is set in environment variables
// });

// app.post('/api/chat',async (req, res) => {
//   const { messages } = req.body; // Extract messages from request body

//   try {
//       const response = await openai.chat.completions.create({
//           model: 'gpt-3.5-turbo',  // Specify the model
//           messages: messages,      // The conversation messages
//       });

//       res.json({
//           response: response.choices[0].message, // Send back the chatbot response
//       });
//   } catch (error) {
//       console.error('Error with OpenAI API:', error.message || error);
//       res.status(500).json({ error: 'Error communicating with OpenAI API' });
//   }
// });