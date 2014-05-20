var mongo = require('mongodb');
 var BSON = mongo.BSONPure;
 

exports.index = function(req, res){
  res.render('recette', { title: 'Liste des recettes' });
};


exports.listerrecette = function(db) {
  return function(req, res) {
    db.collection('recetteColl').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

