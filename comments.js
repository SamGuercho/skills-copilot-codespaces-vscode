//Create Web Server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 8080;
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var config = require('./config');
var router = express.Router();

//Connect to MongoDB
mongoose.connect(config.database);

//Configure app to use bodyParser()
//This will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set static file location for frontend
app.use(express.static(__dirname + '/public'));

//Routes for API
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

//Test route to make sure everything is working
router.get('/', function(req, res) {
  res.json({message: 'hooray! welcome to our api!'});
});

//More routes for API will happen here

//Register routes
//All routes will be prefixed with /api
app.use('/api', router);

//Start the server
app.listen(port);
console.log('Magic happens on port ' + port);

// Path: models/comment.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Comment schema
var CommentSchema = new Schema({
