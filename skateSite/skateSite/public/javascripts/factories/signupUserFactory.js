angular.module('signupUserFactory', [])

  .factory('signupUser', signupUser);

  signupUser.$inject = ["$http"];

  function signupUser($http){

    function signupThisUser(userCredentials){
      return $http({
        method: "POST"
        ,url: "/api/new/user"
        ,data: userCredentials
      })
    }
    return signupThisUser;
  }
