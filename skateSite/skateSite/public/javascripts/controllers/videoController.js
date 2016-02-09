angular.module('videoController', ['seedFactory', 'getPostsFactory', 'postCommentFactory', 'addCommentToVideoPostFactory', 'postVideoFactory', 'signinUserFactory', 'signupUserFactory'])

  .controller('videoCtrl', videoCtrl);

  videoCtrl.$inject = ['$http', 'seedFactory', 'getPosts', 'postComment', 'addCommentToPost', 'postVideo', 'signinUser', 'signupUser'];
  function videoCtrl($http, seedFactory, getPosts, postComment, addCommentToPost, postVideo, signinUser, signupUser){
    //////////////////////
    //////global variables
    //////////////////////
    var self = this;
    self.videoOpen     = false; ////this toggles an ng-if to open a modal
    self.signinToggle  = false; ////this toggles an ng-if to open a signin modal
    self.signupModalToggle = false;
    self.admin         = false; ////global variable to show cms functionality
    self.addAdminPW    = false;
    self.signedInUser  = false;
    self.allPosts;
    self.allComments   = []
    var loadCount = 0;
    //////////////////////
    //end global variables
    //////////////////////

    ///function to check token for admin access
    function checkToken(){
      if(window.localStorage.skateToken == "admin"){
        self.admin = true;
        self.signedInUser = true;
      }
      else if(window.localStorage.skateToken == 'user'){
        self.signedInUser = true;
      }
    }
    checkToken();


    //////load all of our posts into a global variable
    getPosts()
      .then(function(allPosts){
        self.allPosts = allPosts.data;/////this is our global "All Posts" variable
        self.allPosts = self.allPosts.reverse();
        loadComments(self.allPosts);
      })

    function loadComments(allPosts){
      for (var i = 0; i < allPosts.length; i++) {
        self.allComments.push(allPosts[i].comments)
      }
    }

    /////function to asynchronously load all the youtube videos
    function loadVideos(){
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
      else {}
    }
    setInterval(loadVideos, 500);

    ////////////////////////////
    ///begin logic for comment
    ////////////////////////////
    function addComment(evt, index){
      var postId = evt.currentTarget.id
      var commentText = evt.target.parentNode.children.commentText.value;
      postComment({content: commentText, videoPost: postId})
      .then(function(newComment){
        self.allComments[index].push(newComment.data)/////update the current array live
        addCommentToPost(postId, newComment.data)
        .then(function(updPost){
        })
      })
    }
    self.addComment = addComment;
    ////////////////////////////
    ///end logic for comment
    ////////////////////////////

    /////function to see full single post
    function goToSingle(postId){
      window.location.hash = "#/video/"+postId;
    }
    self.goToSingle = goToSingle;

    ////////////////////////////////////////
    ///////////////Post a Video Modal Logic
    ///////////////////////////////////////
    function openModal(){
      self.videoOpen = !self.videoOpen;
      self.signinToggle = false;
    }
    self.openModal = openModal;

    //////function to submit the post
    function submitPost(){
      var title = document.querySelector('.postTitle').value;
      var embedCode = document.querySelector('.postEmbedCode').value;
      var description = document.querySelector('.postDescription').value;
      postVideo({title: title, embedCode: embedCode, description: description})
      .then(function(newPost){
        self.allPosts = self.allPosts.reverse();
        self.allPosts.push(newPost.data);
        self.allPosts = self.allPosts.reverse();
        console.log(self.allPosts);
        loadCount = 0;
        setInterval(loadVideos, 500);
        self.allComments.reverse();
        self.allComments.push([]);
        self.allComments.reverse();
        self.videoOpen = !self.videoOpen;
      })
    }
    self.submitPost = submitPost;

    ////////////////////////////////////////
    //////////End Post a Video Modal Logic
    ///////////////////////////////////////

    ///////////////////////////
    ////Signin Logic //////////
    ///////////////////////////

    //////function to open modal
    function openSigninModal(){
      if(self.signinToggle == false){
        self.signinToggle = !self.signinToggle;
        self.videoOpen = false;
      }
    }
    self.openSignin = openSigninModal;

    function signOut(){
      window.localStorage.skateToken = '';
      self.videoOpen = false;
      self.signinToggle = false;
      self.signupModalToggle = false;
      self.admin = false;
      self.signedInUser = false;
    }
    self.signOut = signOut;

    ///////function to submit signin credentials
    function signinNewUser(){
      var username = document.querySelector('.signinUsername').value;
      var password = document.querySelector('.signinPassword').value;
      var signinCreds = {username: username, password: password}
      signinUser(signinCreds)
      .then(function(user){
        self.currentUser = user.data;
        if(self.currentUser == 'no user'){
          alert('couldnt find that username')
          self.signinToggle = !self.signinToggle;
        }
        else if(self.currentUser == 'password match issue'){
          alert('password didnt match')
          self.signinToggle = !self.signinToggle;
        }
        else {
          if(self.currentUser.admin == true){
            window.localStorage.skateToken = "admin";
            self.admin = true;
            self.signedInUser = !self.signedInUser;
            document.querySelector('.signinButton').innerText = "Signout"
            self.signinToggle = !self.signinToggle;
          }
          else if(self.currentUser.admin == false){
            window.localStorage.skateToken = "user";
            self.signedInUser = !self.signedInUser;
            document.querySelector('.signinButton').innerText = "Signout"
            self.signinToggle = !self.signinToggle;
          }
        }
      })
    }
    self.signinNewUser = signinNewUser;

    //////function to open the signup modal, for new users
    function openSignupModal(){
      self.signupModalToggle = !self.signupModalToggle;
    }
    self.openSignup = openSignupModal;

    //////function to submit a new user for signup
    function submitSignup(){
      var username = document.querySelector('.signupUsername').value;
      var password = document.querySelector('.signupPassword').value;
      if(document.querySelector('.signupAdminPassword').value){
        var adminPassword = document.querySelector('.signupAdminPassword').value;
        var userCredentials = {username: username, password, adminPassword: adminPassword}
      }
      else {
        var userCredentials = {username: username, password}
      }
      signupUser(userCredentials)
        .then(function(newUser){
          if(newUser.data == 'password issue'){
            alert('Your admin password was incorrect, please try again')
          }
          else if(newUser.data == 'username taken'){
            alert('that username is already taken, could you try another one?')
          }
          else {
            if(newUser.data.admin == true){
              window.localStorage.skateToken = "admin";
              self.signedInUser = !self.signedInUser;
              self.admin = true;
              self.signupModalToggle = false;
            }
            else if(newUser.data.admin == false){
              window.localStorage.skateToken = "user";
              self.signedInUser = !self.signedInUser;
              self.signupModalToggle = false;
            }
          }
        })
    }
    self.submitSignup = submitSignup;

    ////add admin signin field
    function addAdminField(){
      self.addAdminPW = !self.addAdminPW;
    }
    self.addAdminField = addAdminField;
    ///////////////////////////
    //end Signin Logic ////////
    ///////////////////////////
  }
