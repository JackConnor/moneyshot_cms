angular.module('videoController', ['seedFactory'])

  .controller('videoCtrl', videoCtrl);

  videoCtrl.$inject = ['$http', 'seedFactory'];
  function videoCtrl($http, seedFactory){
    var self = this;

    self.test1 = seedFactory;
    self.test2 = ['comment1', 'comment2', 'comment3']

    self.testFunction = function(){
      console.log('yoyoyoyoyoyoyo');
    }
    console.log('in the video Controller');
    console.log(seedFactory);
    self.hellYea = seedFactory;
    self.seedComments = ["lasjfdlksaj", "lksjdflkajslkdsjflksja"];
    var loadCount = 0;
    setInterval(function(){
      if(loadCount <= 15 && $('#video0').attr('src') == ''){
        for (var i = 0; i < self.hellYea.length; i++) {
          $("#video"+i).ready(function(){
            console.log('window ready');
            $("#video"+i).attr('src', "https://www.youtube.com/embed/"+self.hellYea[i])
          })
        }
      }
      else if(loadCount <= 15 && $('#video0').attr('src') != ''){
        loadCount = 16;
      }
      else {

      }
    }, 500);
    function addComment(ind){
      console.log(ind);
      console.log('oi');
      var commentText = $('.newComment'+ind).val();
      console.log(commentText);
      self.test2.push(commentText);
    }
    self.addComment = addComment;
  }
