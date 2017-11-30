var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

 var joinedplayers = new Schema({
  gameid: [{type: mongoose.Schema.Types.ObjectId, ref: 'games' }],
 // [{type: mongoose.Schema.Types.ObjectId, ref: 'tableName' }]
  playerid: [{type: mongoose.Schema.Types.ObjectId, ref: 'players' }],

  // date: { type: Date, default: Date.now },
  // buff: Buffer
}, {
    timestamps: true
});
 module.exports = mongoose.model('joinedplayers', joinedplayers);