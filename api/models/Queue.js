/**
 * Queue.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    'venue': {
      type: 'STRING'
    },

    // add a reference to User 
    users: {
      collection : 'user',
      via: 'queues',
      dominant: true
    }

  }

};
