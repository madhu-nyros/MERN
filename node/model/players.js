var mongoose = require('mongoose');
 
var Schema = mongoose.Schema;

 var players = new Schema({
  name: { type: String},
  password: { type: String},
  age: { type: Number},
  gender:{type:String},
  // date: { type: Date, default: Date.now },
  // buff: Buffer
}, {
    timestamps: true
});
 module.exports = mongoose.model('players', players);

// var mongoose = require('mongoose');

// var address = new mongoose.Schema({
//     address_line_1: { type: String },
//     address_line_2: { type: String },
//     country_code: [{type: mongoose.Schema.Types.ObjectId, ref: 'country' }],
//     state_province_region: { type : String },
//     city: { type : String },
//     postal_code: { type: String },
//     is_verified: { type: Number , default : 0 },
//     verification_status: { type : String },
//     geometry: { type: Object },
//     custom_flag_1: { type: Object },
//     address_context : { type : String}, //user or property or company or community or vendor
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Address', address);