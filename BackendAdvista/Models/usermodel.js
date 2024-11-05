const mongoose=require('mongoose')
const bs=require('bcrypt');
const jwt=require('jsonwebtoken')
require('dotenv').config(); 
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: function() {
        return this.auth_provider === 'email'; // Password is required only for 'email' auth provider
      }
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    auth_provider: {
      type: String,
      default: 'email',
      enum: ['email', 'google', 'facebook']
    },
    provider_id: {
      type: String, // This is for Google/Facebook logins
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });

userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified()) {
        user.updated_at = Date.now();
    }

    // If the password field has not been modified, skip hashing and continue with the save
    if (!user.isModified("password")) {
        return next();
    }

    // Try hashing the password before saving
    try {
        const hash = await bs.hash(user.password, 10);
        user.password = hash;
        next(); // Proceed to save the user document
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

userSchema.methods.isPasswordValid=async function(password){
    return bs.compare(password,this.password);
}
userSchema.methods.generateToken =function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY
        );
    } catch (error) {
        console.log(error);
    }   
};
module.exports= mongoose.model('User',userSchema)