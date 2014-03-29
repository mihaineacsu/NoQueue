module.exports = {
  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    // add a reference to Queue
    queues: {
      collection: 'queue',
      via: 'users'
    },
  }

};
