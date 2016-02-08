angular.module('getPostFactory', [])

  .factory('getPost', getPost)

  getPost.$inject = ['$http'];

  function getPost($http){

    function getSinglePost(postId){
      console.log(postId);
      return $http({
        method: "GET"
        ,url: "/api/single/video/"+postId
      })
    }
    return getSinglePost;
  }
