module.exports={
    'facebookAuth':{
        'clientID':process.env.Facebook_APP_ID,
        'clientSecret':process.env.Facebook_APP_SECRET,
        'callbackURL':'http://localhost:3000/api/auth/facebook/callback',
    }
}