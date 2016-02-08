var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videopostSchema = new Schema({
  creator: String//{type: Schema.Types.ObjectId, ref: "User"}
  ,title: String
  ,date: Date
  ,description: String
  ,ytEmbedCode: String
  ,info: String
  ,comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
})

module.exports = mongoose.model('Videopost', videopostSchema);
