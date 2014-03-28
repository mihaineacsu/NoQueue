/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'STRING',
      required: true,
      maxLength: 20,
    },
    email: {
      type: 'EMAIL'
    },
    password: {
      type: 'STRING',
      minLength: 6,
      required: true,
    },

    // add a reference to Queue
    queues: {
      collection: 'queue',
      via: 'users'
    },
    //Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      // Remove the password object value
      delete obj.password;
      // return the new object without password
      return obj;
    }
  },

//TODO figure out why bcrypt doesn't install
//  beforeCreate: function(values, next) {
//    var bcrypt = require('bcrypt');
//
//    bcrypt.genSalt(10, function(err, salt) {
//      if(err) return next(err);
//
//      bcrypt.hash(values.password, salt, function(err, hash) {
//        if(err) return next(err);
//
//        values.password = hash;
//        next();
//      });
//    });
//  }

};
