var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var players = new Schema({
	  name: { type: String},
	  password: { type: String},
	  age: { type: Number},
	  gender:{type:String},
    }, {
    timestamps: true
});
 module.exports = mongoose.model('players', players);
