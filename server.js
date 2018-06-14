var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
let postsData = require('./initdb.json');
// var MongoClient = require('mongodb').MongoClient;
//
// var mongoHost = process.env.MONGO_HOST;
// var mongoPort = process.env.MONGO_PORT || '27017';
// var mongoUsername = process.env.MONGO_USERNAME;
// var mongoPassword = process.env.MONGO_PASSWORD;
// var mongoDBName = process.env.MONGO_DB_NAME;
//
// var mongoURL = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName;
//
// var mongoDB = null;

var app = express();
var port = process.env.PORT || 3001;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


console.log("Post data test =>" + postsData.length );





app.get("/:classNumber/:instructor", function(req, res, next){
	var classID = req.params.classNumber.toLowerCase();
	var inst = req.params.instructor.toLowerCase();
	let dbLocation;
	for(let index = 0; index < postsData.length; index++){

		if(classID === postsData[index].class.toLowerCase()){

			console.log("==InstructorParam" + inst
			+ " VS " + postsData[index].instructor.toLowerCase());

			if(inst === postsData[index].instructor.toLowerCase()){
				console.log("Class found at index: " + index);
				dbLocation = index;
				break;
			}
		} else {
			console.log("Not found!");
			dbLocation = -1;
		}
	}
	console.log("===DBLocation: " + dbLocation);
	if(dbLocation !== -1){
		res.status(200).render('classPage',{
			class: [postsData[dbLocation]]
		});
	} else {
		next();
	}
});

app.get('/',function(req, res, next){
	console.log("Serving /");
	res.status(200).render('classPage',{
    class: postsData
  }); //homepage default load
});


app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
	res.status(404).render('404');
});

// MongoClient.connect(mongoURL, function (err, client) {
// 	if (err) {
// 		throw err;
// 	}
// 	mongoDB = client.db(mongoDBName);
// 	app.listen(port, function () {
// 		console.log("== Server listening on port", port);
// 	});
// })

app.listen(port, function () {
	console.log("== Server is listening on port", port);
});
