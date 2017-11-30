var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var games = new Schema({
  gamename: { type: String},
  imagename: { type: String},
}, {
    timestamps: true
});
 module.exports = mongoose.model('games', games);
