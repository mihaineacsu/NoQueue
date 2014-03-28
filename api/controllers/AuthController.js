/**
 * AuthController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require("passport");

module.exports = {
  process: function(req,res){
    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)) {
        res.redirect('/login');
        return;
      }
      req.logIn(user, function(err){
        if (err) res.redirect('/login');
        return res.redirect('/');
      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  },

  // https://developers.facebook.com/docs/
  // https://developers.facebook.com/docs/reference/login/
  login: function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function (err, user) {
      req.logIn(user, function (err) {
        if (err) {
          console.log(err);
          res.view('500');
          return;
        }

        res.redirect('/');
        return;
      });
    })(req, res);
  },

  result: function(req, res) {
    console.log(req);
    console.log(req.user);
    res.json(req.user);
  },


  _config: {}
};
