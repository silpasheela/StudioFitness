const passport = require('passport')
const User = require('../models/userModel')
require('dotenv').config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "938437657695-8dgijp5akt5l14jagfk4lgoe10773ru3.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/user/auth/google/callback",
},
async function (accessToken, refreshToken, profile, done) {

    try {
        const existing = await User.findOne({ email: profile.emails[0].value })
        if (existing) {
            return done(null, {user:existing}, { message: "Logged in succesfully" })
        }
        const emailExisting = await User.findOne({
            email: profile.emails[0].value,
        })
        if (emailExisting) return done({ message: "User already exists" })

        const user = await User.create({

            fullName: profile.displayName,
            email: profile.emails[0].value,
            isEmailVerified: true,
            googleId: profile.id,
        })
        return done(null, user)
        } catch (error) {
        console.log(error)
        done(error)
    }
}))


module.exports = passport;