angular.module('videoController', ['seedFactory', 'getPostsFactory', 'postCommentFactory', 'addCommentToVideoPostFactory'])

  .controller('videoCtrl', videoCtrl);

  videoCtrl.$inject = ['$http', 'seedFactory', 'getPosts', 'postComment', 'addCommentToPost'];
  function videoCtrl($http, seedFactory, getPosts, postComment, addCommentToPost){
    var self = this;

    self.videoOpen  = false; ////this toggles an ng-if to open a modal
    console.log(addCommentToPost);
    //////load all of our posts into a global variable
    self.allPosts;
    getPosts()
      .then(function(allPosts){
        self.allPosts = allPosts.data;/////this is our global "All Posts" variable
        console.log(self.allPosts);
        loadComments(self.allPosts);
      })

    self.allComments = []

    function loadComments(allPosts){
      for (var i = 0; i < allPosts.length; i++) {
        self.allComments.push(allPosts[i].comments)
      }
    }



    /////function to asynchronously load all the youtube videos
    var loadCount = 0;
    setInterval(function(){
      if(loadCount <= 15 && $('#video0').attr('src') == ''){
        for (var i = 0; i < self.allPosts.length; i++) {
          $("#video"+i).ready(function(){
            $("#video"+i).attr('src', "https://www.youtube.com/embed/"+self.allPosts[i].ytEmbedCode)
          })
        }
      }
      else if(loadCount <= 15 && $('#video0').attr('src') != ''){
        loadCount = 16;
      }
      else {

      }
    }, 500);

    ////////////////////////////
    ///begin logic for comment
    ////////////////////////////
    function addComment(evt, index){
      console.log(index);
      var postId = evt.currentTarget.id
      var commentText = evt.target.parentNode.children.commentText.value;
      console.log(commentText);
      postComment({content: commentText, videoPost: postId})
      .then(function(newComment){
        self.allComments[index].push(newComment.data)/////update the current array live
        addCommentToPost(postId, newComment.data)
        .then(function(updPost){
          console.log(updPost);
        })
      })
    }
    self.addComment = addComment;
    ////////////////////////////
    ///end logic for comment
    ////////////////////////////

    /////function to see full single post
    function goToSingle(postId){
      console.log('yooyoy');
      console.log(postId);
      window.location.hash = "#/video/"+postId;
    }
    self.goToSingle = goToSingle;

    ////////////////////////////////////////
    ///////////////Post a Video Modal Logic
    ///////////////////////////////////////
    function openModal(){
      console.log(self.videoOpen);
      self.videoOpen = !self.videoOpen;
    }
    self.openModal = openModal;
    ////////////////////////////////////////
    //////////End Post a Video Modal Logic
    ///////////////////////////////////////

  }
