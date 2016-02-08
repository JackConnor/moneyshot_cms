angular.module('addCommentToVideoPostFactory', [])

  .factory('addCommentToPost', addCommentToPost);

  addCommentToPost.$inject = ['$http'];

  function addCommentToPost($http){

    function updatePost(postId, comment){
      console.log(postId);
      console.log(comment);
      return $http({
        method: "POST"
        ,url: "/api/addcomment/videopost/"+postId
        ,data: comment
      })
    }
    return updatePost
  }
