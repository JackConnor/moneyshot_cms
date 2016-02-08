angular.module('postCommentFactory', [])

  .factory('postComment', postComment);

  postComment.$inject = ["$http"];
  function postComment($http){

    function postThatComment(commentData){
      return $http({
        method: "POST"
        ,url: "/api/new/comment"
        ,data: commentData
      })
    }

    return postThatComment;
  }
