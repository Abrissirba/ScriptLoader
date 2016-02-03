// Require the stuff we need
var express = require("express");
var http = require("http");
var path = require('path');
var fs = require('fs');

// Build the app
var app = express();

//root path from where all static files are served
app.get('/src/test/:file', function(req, res){
	var timeouts = {
		"one.js": 500,
		"two.js": 1000,
		"three.js": 0
	};
	setTimeout(function() {
		res.send("if(!" + req.query.s + "){ var " + req.query.s + " = '';} " + req.query.s + " = " + req.query.s + " + '" +  req.params.file.substr(0, req.params.file.indexOf(".js")) + "';");
	}, timeouts[req.params.file]);
});

app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/fail'));

app.get('/', function(req, res, next){
	res.send(fs.readFileSync("src/test/index.html", {encoding: 'utf8'}));
});

// Start it up!
var server = http.createServer(app).listen(1337, function() {
    console.log('Express server listening on port ' + 1337);
} );