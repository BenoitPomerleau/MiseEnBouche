
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var idee = require('./routes/idee');
var recette = require('./routes/recette');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

// mongoose setup
var recipeSchema = require('./db.js');

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//    		        GenerateDbSchemas();
//	            });

var app = express();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());



// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
////app.use(app.router);
////app.use(require('stylus').middleware(path.join(__dirname, 'public')));
////app.use(express.static(path.join(__dirname, 'public')));




// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});




router.route('/recettes')

	// create a bear (accessed at POST http://localhost:1337/recettes)
	//.post(function(req, res) {

	//	var bear = new Bear();		// create a new instance of the Bear model
	//	bear.name = req.body.name;  // set the bears name (comes from the request)

	//	bear.save(function(err) {
	//		if (err)
	//			res.send(err);

	//		res.json({ message: 'Bear created!' });
	//	});


	//})

	// get all the bears (accessed at GET http://localhost:1337/recettes)
	.get(function(req, res) {
		recipeSchema.find(function(err, rec) {
			if (err)
				res.send(err);

			res.json(rec);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
//router.route('/bears/:bear_id')

//	// get the bear with that id
//	.get(function(req, res) {
//		Bear.findById(req.params.bear_id, function(err, bear) {
//			if (err)
//				res.send(err);
//			res.json(bear);
//		});
//	})

//	// update the bear with this id
//	.put(function(req, res) {
//		Bear.findById(req.params.bear_id, function(err, bear) {

//			if (err)
//				res.send(err);

//			bear.name = req.body.name;
//			bear.save(function(err) {
//				if (err)
//					res.send(err);

//				res.json({ message: 'Bear updated!' });
//			});

//		});
//	})

//	// delete the bear with this id
//	.delete(function(req, res) {
//		Bear.remove({
//			_id: req.params.bear_id
//		}, function(err, bear) {
//			if (err)
//				res.send(err);

//			res.json({ message: 'Successfully deleted' });
//		});
//	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Mise en bouche server listening on port ' + app.get('port'));






//app.get('/', recette.index);
                    
////app.get('/idees', idee.listeridee(dbRecette));
////app.get('/recettes', recette.index);
//app.get('/recettes', recette.listerRecette(recipeSchema));
////app.get('/recette/:id', recette.detail);
////app.get('/recettesJSON', recette.listerRecette(Recipe));


//http.createServer(app).listen(app.get('port'), function(){
//    console.log('Mise en bouche server listening on port ' + app.get('port'));
//});



//function GenerateDbSchemas(){
//    console.log('Génération des schémas bd');

//    var recipeSchema = new mongoose.Schema({
//                            name: String,
//                            rating: String,
//                            comments: [{ body: String, date: Date }],
//                            prepTime: String,
//                            cookTime: String,
//                            nbPortion: Number,
//                            lastCooked: Date,
//                            date: { type: Date, default: Date.now },
//                            categoryList: [{ name: String }],
//                            ingredientList: [{ quantity: String, name: String }],
//                            stepList: [{ description: String }]
//                            });

//    console.log('Génération des modèles bd');

//    // Compile a 'Recipe' model using the recipeSchema as the structure.
//    // Mongoose also creates a MongoDB collection called 'Recipes' for these documents.
//    Recipe = mongoose.model('Recipe', recipeSchema);

//}


