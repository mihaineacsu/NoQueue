/**
 * QueueController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var _ = require('lodash');

module.exports = {
  addUserToQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === null || uid === null) {//TODO is this correct?
      throw 'ids missing.';
    }

    Queue.findOne(qid).exec(function(err,queue) {
      queue.users.add(uid);

      queue.save(function(err) {});

      Queue.findOne(qid).populate('users').exec(function(err, queue) {
        res.json(queue);
      });
    });

  },

  getUserStateInQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === null || uid === null) {//TODO is this correct?
      throw 'ids missing.';
    }

    Queue.findOne(qid).populate('users').exec(function(err, queue){
      for(var i = 0; i < queue.users.length; i++) {
        if(queue.users[i].id == uid){
          return res.json(queue.users[i]);
        }
      }

      res.json({});
    });

  },

  updateUserStateInQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === null || uid === null) {//TODO is this correct?
      throw 'ids missing.';
    }

    //TODO implement / what does it do ?

  },

  removeUserFromQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === null || uid === null) {//TODO is this correct?
      throw 'ids missing.';
    }

    Queue.findOne(qid).exec(function(err,queue) {

      Queue.findOne(qid).populate('users').exec(function(err, queue) {
        for(var i = 0; i < queue.users.length; i++) {
            console.log(uid);
          if(queue.users[i].id == uid){
            res.json(queue.users[i]);
            break;
          }
        }

        queue.users.remove(uid);

        queue.save(function(err) {});
      });
    });
  }

};
