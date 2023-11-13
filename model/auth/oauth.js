const passport = require('passport')
const GoogleStrats = require('passport-google-oauth2').Strategy
const User = require('./user')
passport.serializeUser((user,done) =>{
    done(null,user.id)
})

passport.deserializeUser((id,done) =>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})
passport.use(new GoogleStrats({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) =>{
    console.log(profile)
    User.findOne({googleId: profile.sub}).then((currentUser) => {
        if(currentUser){
            done(null, currentUser)
        } else {
            new User({
                email: profile.email,
                username: profile.displayName,
                photourl: profile.picture,
                surname: profile.given_name,
                steps: false,
                googleId: profile.sub
            }).save().then((newUser) => {
                done(null, newUser)
            }).catch(err => {
                console.log(err)
            })
            const registeruser = User.register(newuser)
            
        }
    }).catch(err =>{
        console.log(err)
    })

}
))