const {google}=require('googleapis');



const Google_CLIENT_ID=process.env.Google_CLIENT_ID;

const Google_CLIENT_SECRET=process.env.Google_CLIENT_SECRET;

exports.oauth2client=new google.auth.OAuth2(
    Google_CLIENT_ID,
    Google_CLIENT_SECRET,
    'postmessage'
)