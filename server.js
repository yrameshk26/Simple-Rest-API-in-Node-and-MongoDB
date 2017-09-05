// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

mongoose.connect('mongodb://localhost/ramesh');
mongoose.Promise = global.Promise;
mongoose.connection.once('open', function(){
    console.log('Connection has been made.');
}).on('error', function(error){
    console.log('Connection Error.',error);
})

// ROUTES FOR OUR API
// =============================================================================
var router = require('./routes/api');              // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

//Error handling Middleware
app.use(function(err, req, res, next){
    res.status(444).send({error: err.message});
});

// START THE SERVER
// =============================================================================
app.listen(port,function(){
console.log('Magic happens on port ' + port);
});
