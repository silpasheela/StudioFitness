const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel')

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = "MySecretKey";

// passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       const user = await User.findById(jwt_payload.sub);
  
//       if (user) {
//         return done(null, user);
//       } else {
//           return done(null, false);
//         }
//     } catch (error) {
//         return done(error, false);
//       }
//   }));
  


//   module.exports = passport;




passport.use(
  new JwtStrategy(
    {
      secretOrKey: "MySecretKey",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)


  module.exports = passport;
