var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt');

var userSchema = new Schema({
  username: String
  ,passwordDigest: String
  ,admin: Boolean
})

module.exports = mongoose.model('User', userSchema)
