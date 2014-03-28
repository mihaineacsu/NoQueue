var passport    = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


//var bcrypt = require('bcrypt');

var verifyHandler = function (token, tokenSecret, profile, done) {
  process.nextTick(function () {

    User.findOne({
      or: [
        {uid: parseInt(profile.id)},
        {uid: profile.id}
      ]
    }).done(function (err, user) {
      if (user) {
        return done(null, user);
      } else {

        var data = {
          provider: profile.provider,
          id: profile.id,
          name: profile.displayName
        };

        if(profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if(profile.name && profile.name.givenName) {
          data.fistname = profile.name.givenName;
        }
        if(profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }

        User.create(data).done(function (err, user) {
          return done(err, user);
        });
      }
    });
  });
};


passport.serializeUser(function(user, done) {
  done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//passport.use(new LocalStrategy(
//  function(username, password, done) {
//  User.findByUsername(username).done(function(err, user) {
//    if (err) { return done(null, err); }
//    if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
//    //      bcrypt.compare(password, user[0].password, function(err, res) {
//    //        if (!res) return done(null, false, { message: 'Invalid Password'});
//    //        return done(null, user);
//    //      });
//    if(password !== user[0].password) {
//      return done(null, false, {message: 'Invalid Passport'});
//    }
//    return done(null, user);
//
//  });
//}));

module.exports = {
  express: {
    customMiddleware: function(app){
      console.log('express middleware for passport');

      passport.use(new FacebookStrategy({
        clientID: "1456628884572134",
        clientSecret: "94eba1f3201fcc6d394295e2d72e6160",
        callbackURL: "http://localhost:1337"
      },
      verifyHandler));

      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
