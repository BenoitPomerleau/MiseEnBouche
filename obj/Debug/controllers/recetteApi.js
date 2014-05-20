    /* The API controller
       Exports 3 methods:
       * post - Creates a new thread
       * list - Returns a list of threads
       * show - Displays a thread and its posts
    */


var Recipe = require('../models/recipe.js');
//var Post = require('../models/post.js');

exports.index = function(req, res){
  res.render('recette', { title: 'Liste des recettes' });
};


exports.list = function (req, res) {
    Recipe.find(function (err, listeRecette) {
        //res.send(recette);
        res.render('recette', { title: 'Liste des recettes', recettes: listeRecette })
    });
}


// first locates a thread by title, then locates the replies by thread ID.
exports.get = function (req, res) {
    Recipe.find({ _id: req.params.id }, function (error, recette) {
        res.send([{ recette: recette }]);
        });
}

exports.post = function (req, res) {
    //new Thread({ title: req.body.title, author: req.body.author }).save();

    //return function(req, res) {
    //var rec = new Recipe({
    //        name: 'Paté chinois',
    //        rating: '4/10',
    //        comments: [{body: "un classique québécois"}, {body: "grace à la petite vie"} ],
    //        prepTime: '20 min',
    //        cookTime: '30 min',
    //        nbPortion: 4,
    //        categoryList: ["pas cher", "classique", "pour les enfants"],
    //        ingredientList: [{quantity: "1 lb",
    //            name: "steak haché"},
    //                         {quantity: "2 cans",
    //                             name: "mais"},
    //                         {quantity: "4",
    //                             name: "patates"},
    //                         {quantity: "1/2",
    //                             name: "oignon"}],
    //        stepList: ["faire des patate pilées",
    //                   "émincer l'oignon",
    //                   "faire revenir la viande avec les oignons", 
    //                   "mettre dans un plat allant au four selon l'ordre steak-blé d'inde- patate", 
    //                   "parsemer de paprika",
    //                   "faire cuire à 400 pendant 30 min"]});

    var rec = new Recipe({
            name: 'Paté chinois',
            rating: '4/10',
            comments: [{body: "un classique québécois"}, {body: "grace à la petite vie"} ],
            prepTime: '20 min',
            cookTime: '30 min',
            nbPortion: 4});


        rec.save();

        //rec.save(function(err, rec) {
        //    res.send((err === null) ? { msg: '' } : { msg: err });

        //    if (err) return console.error(err);
        //    console.dir(rec);
        //});
}



exports.update = function (req, res) {
    Recipe.findById(req.params.id, function(err, recette) {
        if (err)
	        res.send(err);

        recette.name = req.body.name; 	// update the bears info
        recette.rating = req.body.rating;

        // save the bear
        recette.save(function(err, nouvelleRecette, nbUpdate) {
	        if (err)
		        res.send(err);

	        res.json({ message: 'recipe updated!' });
        });
    });
}

exports.delete = function (req, res) {
    Recipe.remove({
			_id: req.params.id
		}, function(err, recette) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
}