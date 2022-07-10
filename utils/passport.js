const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

    const { PASSWORD_TOKEN }=require("./config") 

// load up the user model
const User = require('../models').User;

module.exports = (passport)=> {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: PASSWORD_TOKEN,
  };
  passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done)=> {
    User.findByPk(jwt_payload.id)
      .then((user) => { return done(null, user); })
      .catch((error) => { return done(error, false); });
  }));
};