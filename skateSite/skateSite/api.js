var express        = require('express');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

/////////////////////
/////////////////////
////require model////

////require model////
/////////////////////
/////////////////////


angular.module = function(app){

app.get('/api/test', function(req, res){
  console.log('got it');
  res.json('testing testing')
});

}

// mongoose.connect(process.env.DB_URL_2);
