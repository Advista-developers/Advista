const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(

    
    
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:5173/api/auth/google/callback", // full URL
			scope: [
				"https://www.googleapis.com/auth/userinfo.profile", 
				"https://www.googleapis.com/auth/userinfo.email"
			],
		},
		function (accessToken, refreshToken, profile, done) {
			try {
				// Optional: Save user profile to database
				done(null, profile);
			} catch (error) {
				done(error, null);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
