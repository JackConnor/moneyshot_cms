var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var route          = express.Router();
var methodOverride = require('method-override');

/////////////////////
/////////////////////
////require model////
var Videopost = require('./models/videopost.js');
var Comment   = require('./models/comment.js');
////require model////
/////////////////////
/////////////////////

module.exports = function(app){


  ///////////////////////////////////
  //////begin all videopost routes
  ///////////////////////////////////
  ///get all posts with comments Route
  app.get("/api/allposts", function(req, res){
    Videopost.find({})
    .populate('comments')//////we want to pull all our comments with our videoposts
    .exec(function(err, allPosts){
      res.json(allPosts);
    })
  })

  app.post('/api/video', function(req, res){
    console.log(req.body);
    var newVideo = new Videopost();
    console.log(newVideo);
    newVideo.creator = req.body.creator;
    newVideo.title = req.body.title;
    newVideo.description = req.body.description;
    newVideo.ytEmbedCode = req.body.ytEmbedCode;
    newVideo.save(function(err, savedVideo){
      if(err){console.log(err)}
      console.log(savedVideo);
      res.json(savedVideo)
    })
  })

  ///////add a single comment to it's proper videopost
  app.post('/api/addcomment/videopost/:postId', function(req, res){
    console.log(req.body);
    Videopost.findOne({"_id":req.params.postId}, function(err, videopost){
      videopost.comments.push(req.body)
      videopost.save(function(err, updatedPost){
        console.log(updatedPost);
        res.json(updatedPost);
      })
    })
  })

  ///////////////////////////////////
  //////End all videopost routes
  ///////////////////////////////////

  ///////////////////////////////////
  //////begin all comment routes
  ///////////////////////////////////
  ////get all comments
  app.get('/api/comments', function(){
    Comment.find({}, function(err, allComments){
      console.log(allComments);
      res.json(allComments);
    })
  })

  //////post a comment
  app.post('/api/new/comment', function(req, res){
    Comment.create(req.body, function(err, newComment){
      if(err){console.log(err)}
      res.json(newComment);
    })
  })

  ///////////////////////////////////
  //////end all comment routes
  ///////////////////////////////////

}

mongoose.connect("mongodb://jackconnor:Skateboard1@ds037195.mongolab.com:37195/skate_site");
