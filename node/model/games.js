var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

 var games = new Schema({
  gamename: { type: String},
  imagename: { type: String},

  // date: { type: Date, default: Date.now },
  // buff: Buffer
}, {
    timestamps: true
});
 module.exports = mongoose.model('games', games);
