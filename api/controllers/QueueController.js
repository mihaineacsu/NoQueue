/**
 * QueueController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  getAllEnqueuedUsers: function(req, res) {
    Queue.findOne(req.param('queueid')).populate('users').exec(function(err, queue) {
      return res.json(queue.users);
    });
  },

  addUserToQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === undefined || uid === undefined) {//TODO is this correct?
      throw 'ids missing.';
    }

    Queue.findOne(qid).exec(function(err,queue) {
      queue.users.add(uid);
      User.findOne(uid).exec(function(err,user) {
        //TODO add priority number to each user
      });
      queue.queued = (queue.queued + 1) || 1;

      queue.save(function(err) {});
      
      Users.findOne(uid).exec(function(err,user) {
        if(user.queue == undefined) user.queue = {};

//TODO implement scheduling
//        user.queue[qid] = 
      })

      Queue.findOne(qid).populate('users').exec(function(err, queue) {
        res.json(queue);
      });
    });

  },

  getUserStateInQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === undefined || uid === undefined) {//TODO is this correct?
      throw 'ids missing.';
    }

    Queue.findOne(qid).populate('users').exec(function(err, queue){
      if(err) throw err;


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

    if(qid === undefined || uid === undefined) {//TODO is this correct?
      throw 'ids missing.';
    }

    //TODO implement / what does it do ?

  },

  removeUserFromQueue: function(req, res) {
    var qid, uid;
    qid = req.param('queueid');
    uid = req.param('userid');

    if(qid === undefined || uid === undefined) {//TODO is this correct?
      throw 'ids missing.';
    }

    Queue.findOne(qid).exec(function(err,queue) {

      Queue.findOne(qid).populate('users').exec(function(err, queue) {
        for(var i = 0; i < queue.users.length; i++) {
            console.log(uid);
          if(queue.users[i].id == uid){
            res.json(queue.users[i]);
            queue.queued = queue.queued - 1;
            break;
          }
        }

        queue.users.remove(uid);

        queue.save(function(err) {});
      });
    });
  }

};
