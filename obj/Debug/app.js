// The main application script, ties everything together.
 
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');

var app = express();


// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost:27017/recettes');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

 
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
});
 


// set up the RESTful API, handler methods are defined in api.js
var recetteApi = require('./controllers/recetteApi.js');

app.get('/', recetteApi.index);
app.get('/recettes', recetteApi.list);
app.get('/recettes/:id', recetteApi.get);

app.post('/recettes', recetteApi.post);
app.put('/recettes/:id', recetteApi.update);
app.delete('/recettes/:id', recetteApi.delete);

 
http.createServer(app).listen(app.get('port'), function(){
    console.log('Mise en bouche écoute sur le port ' + app.get('port'));
});