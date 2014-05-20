//var mongoose = require('mongoose')
//   ,Schema = mongoose.Schema
//   ,ObjectId = Schema.ObjectId;
 
//var postSchema = new Schema({
//    thread: ObjectId,
//    date: {type: Date, default: Date.now},
//    author: {type: String, default: 'Anon'},
//    post: String
//});
 
//module.exports = mongoose.model('Post', postSchema);


var mongoose = require('mongoose');
 
var recipeSchema = new mongoose.Schema({
                            id: mongoose.Schema.ObjectId,
                            name: String,
                            rating: String,
                            comments: [{ body: String, date: Date }],
                            prepTime: String,
                            cookTime: String,
                            nbPortion: Number,
                            lastCooked: Date,
                            date: { type: Date, default: Date.now },
                            categoryList: [{ name: String }],
                            ingredientList: [{ quantity: String, name: String }],
                            stepList: [{ description: String }]
                            });
 
module.exports = mongoose.model('Recipe', recipeSchema);

//mongoose.connect('mongodb://localhost:27017/recettes');


    

