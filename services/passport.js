const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Users = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    Users.findById(id)
        .then(user => done(null, user))
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            Users.findOne({ googleID: profile.id })
                .then((existingUser) => {
                    if(existingUser){
                      //we already have a record of this user  
                      //1st: error message. 
                      //2nd: user record
                      done(null, existingUser); 
                    }
                    else{
                        //we dont have a record of this user. make a new record
                        new Users({ googleID: profile.id})
                            .save()
                            .then(user => done(null, user))      
                    }
                })
        }
    )
);