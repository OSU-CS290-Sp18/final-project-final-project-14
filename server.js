var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;
  
var mongoDB = null;

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/',function(req, res, next){
	res.status(200).render('main'); //homepage default load
});

app.get("/:classNumber/:instructor", function(req, res, next){
	var classID = req.params.classNumber.toLowerCase();
	var inst = req.params.instructor.toLowerCase();
	var classData = mongoDB.collection('classes');
	classData.find({classID: classID}).toArray(function(err, classPosts){
		if(err){
			res.status(500).send("Error fetching class posts from DB.");
		} else if(classPosts.length >0){
			res.status(200).render('classPage', classPosts[0]);
		} else {
			next();
		}
	});
});

app.get('*', function (req, res) {
	res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client) {
	if (err) {
		throw err;
	}
	mongoDB = client.db(mongoDBName);
	app.listen(port, function () {
		console.log("== Server listening on port", port);
	});
})

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});