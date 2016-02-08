angular.module('signinUserFactory', [])

  .factory('signinUser', signinUser);

  signinUser.$inject = ['$http'];

  function signinUser($http){

    function signingIn(signinCreds){
      console.log(signinCreds);
      return $http({
        method: "POST"
        ,url: "/api/admin/signin"
        ,data: signinCreds
      })
    }
    return signingIn;
  }
