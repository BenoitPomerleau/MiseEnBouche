var mongo = require('mongodb');
 var BSON = mongo.BSONPure;
 

/*
 * GET userlist page.
 */

exports.listeridee = function(db) {
  return function(req, res) {
    db.collection('ideeCollection').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

