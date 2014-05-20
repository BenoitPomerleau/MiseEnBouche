//var express = require('express');
var mongo = require('mongodb');
//var bodyParser = require('body-parser');

var BSON = mongo.BSONPure;
//var router = express.Router(); 		


exports.index = function(req, res){
  res.render('recette', { title: 'Liste des recettes' });
};


exports.listerRecette = function(modele) {
  return function(req, res) {
    modele.find(function(err, recipes) {
        if (err) return console.error(err);
            console.dir(recipes);
        });
    }
};


exports.creerRecette = function(modele) {
    
    return function(req, res) {
        var rec = new Recipe({
                        name: 'Paté chinois',
                        rating: '4/10',
                        comments: [{body: "un classique québécois"}, {body: "grace à la petite vie"} ],
                        prepTime: '20 min',
                        cookTime: '30 min',
                        nbPortion: 4,
                        categoryList: ["pas cher", "classique", "pour les enfants"],
                        ingredientList: [{quantity: "1 lb",
                                          name: "steak haché"},
                                         {quantity: "2 cans",
                                          name: "mais"},
                                         {quantity: "4",
                                          name: "patates"},
                                         {quantity: "1/2",
                                          name: "oignon"}],
                        stepList: ["faire des patate pilées",
                                   "émincer l'oignon",
                                   "faire revenir la viande avec les oignons", 
                                   "mettre dans un plat allant au four selon l'ordre steak-blé d'inde- patate", 
                                   "parsemer de paprika",
                                   "faire cuire à 400 pendant 30 min"]});

        modele.save(function(err, rec) {
            res.send((err === null) ? { msg: '' } : { msg: err });

            if (err) return console.error(err);
            console.dir(rec);
        });
      
      
      //db.collection('userlist').insert(req.body, function(err, result){
      //res.send(
      //  (err === null) ? { msg: '' } : { msg: err }
      //);
    //});
  }
};

exports.majRecette = function(db) {
  return function(req, res) {
  	//var idToUpdate = req.params.id;

  	//req.body._id = new BSON.ObjectID(req.body._id);

    //db.collection('userlist').update({_id : new BSON.ObjectID(idToUpdate)}, req.body, function(err, result){
    //  res.send(
    //    (err === null) ? { msg: '' } : { msg: err }
    //  );
    //});
  }
};

