const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "438555220509-l3fs758ouei2lgig7hhvv7fqo8l15q86.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/google/callBack"
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function (user, done) {
    done(null,user)
})
passport.deserializeUser(function (user, done) {
    done(null,user)
})