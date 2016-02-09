angular.module('singleController', ['getPostFactory', 'signupUserFactory', 'signinUserFactory'])

  .controller('singleCtrl', singleCtrl);

  singleCtrl.$inject = ["$http", 'getPost', 'signupUser', 'signinUser']

  function singleCtrl($http, getPost, signupUser, signinUser){
    var self = this;
    self.signedInUser = false;
    self.admin        = false;
    self.signinToggle = false;
    self.signupModalToggle = false;
    var loadCount = 0;

    /////function to check for a signed in user
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

    ////////function to load the video asynchronously

    getPost(window.location.hash.split('/')[2])
      .then(function(currentPost){
        self.singlePostData = currentPost.data;
        $("#videoSingle").attr('src', "https://www.youtube.com/embed/"+self.singlePostData.ytEmbedCode)
      })

      ///////////////////////////
      ////Signin Logic //////////
      ///////////////////////////

      //////function to open modal
      function openSigninModal(){
        if(self.signinToggle == false){
          self.signinToggle = !self.signinToggle;
          self.signupModalToggle = false;
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
        console.log(signinCreds);
        signinUser(signinCreds)
        .then(function(user){
          self.currentUser = user.data;
          console.log(self.currentUser);
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
        self.signinToggle = false;
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
        console.log(userCredentials);
        signupUser(userCredentials)
          .then(function(newUser){
            if(newUser.data == 'password issue'){
              alert('Your admin password was incorrect, please try again')
            }
            else if(newUser.data == 'username taken'){
              alert('that username is already taken, could you try another one?')
            }
            else {
              console.log(newUser.data);
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
        console.log('yoyoyoyo');
        self.addAdminPW = !self.addAdminPW;
      }
      self.addAdminField = addAdminField;
      ///////////////////////////
      //end Signin Logic ////////
      ///////////////////////////
  ////////End Single controller
  /////////////////////////////
  /////////////////////////////
  }
