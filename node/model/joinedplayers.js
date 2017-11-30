var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var joinedplayers = new Schema({
  gameid: [{type: mongoose.Schema.Types.ObjectId, ref: 'games' }],
  playerid: [{type: mongoose.Schema.Types.ObjectId, ref: 'players' }],
}, {
    timestamps: true
});
 module.exports = mongoose.model('joinedplayers', joinedplayers);