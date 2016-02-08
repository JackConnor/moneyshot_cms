var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  content: String
  ,creator: String//{type: Schema.Types.ObjectId, ref: "User"}///add once user model is added
  ,videopost: {type: Schema.Types.ObjectId, ref: "Videopost"}
})

module.exports = mongoose.model('Comment', commentSchema);
