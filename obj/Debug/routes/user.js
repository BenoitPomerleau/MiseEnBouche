var mongo = require('mongodb');
 
var BSON = mongo.BSONPure;
 

/*
 * GET userlist page.
 */

exports.userlist = function(db) {
  return function(req, res) {
    db.collection('userlist').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

/*
 * POST to adduser.
 */

exports.adduser = function(db) {
  return function(req, res) {
    db.collection('userlist').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

exports.updateuser = function(db) {
  return function(req, res) {
  	var idToUpdate = req.params.id;

  	req.body._id = new BSON.ObjectID(req.body._id);

    db.collection('userlist').update({_id : new BSON.ObjectID(idToUpdate)}, req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

exports.deleteuser = function(db) {
  return function(req, res) {
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};
