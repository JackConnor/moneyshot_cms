angular.module('getPostsFactory', [])

  .factory('getPosts', getPosts);

  getPosts.$inject = ['$http'];

  function getPosts($http){
    function getAllPosts(){
      return $http({
        method: "GET"
        ,url: "/api/allposts"
      })
    }
    return getAllPosts;
  }
