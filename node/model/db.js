var mongoose = require('mongoose');
//var mongoURI = "mongodb://localhost/sports";
var mongoURI = "mongodb://localhost:27017/sports";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});