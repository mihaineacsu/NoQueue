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
    password: {
      type: 'STRING',
      minLength: 6,
      required: true,
    },

    // add a reference to Queue
    queues: {
      collection: 'queue',
      via: 'users'
    }
  }

};
