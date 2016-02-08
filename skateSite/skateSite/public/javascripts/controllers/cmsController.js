angular.module('cmsController', ['seedFactory', 'postVideoFactory'])

  .controller('cmsCtrl', cmsCtrl);

  cmsCtrl.$inject = ['$http', 'seedFactory', 'postVideo'];
  function cmsCtrl($http, seedFactory, postVideo){
    var self = this;
    console.log('in the cms controller');
    console.log(postVideo);
    function submitPost(){
      var title = document.querySelector('.postTitle').value;
      var embedCode = document.querySelector('.postEmbedCode').value;
      var description = document.querySelector('.postDescription').value;
      postVideo({title: title, embedCode: embedCode, description: description})
      .then(function(newPost){
        console.log(newPost);
      })
    }
    self.submitPost = submitPost;
    // postVideo({title: "First Post", embedCode: "EpZCdE1yI94"})
    // .then(function(newPost){
    //   console.log(newPost);
    //   window.location.hash = "#/"
    // })

  /////////end cms controller/////////
  ////////////////////////////////////
  }
