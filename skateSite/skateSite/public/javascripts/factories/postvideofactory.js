angular.module('postVideoFactory', [])

  .factory('postVideo', postVideo);

  postVideo.$inject = ['$http']

  function postVideo($http){
    var self = this;

    function getData(postData){
      console.log(postData);
      return $http({
        method: "POST"
        ,url: "api/video"
        ,data: {creator: "Jack", title: postData.title, ytEmbedCode: postData.embedCode, description: postData.description}
      })
    }
    return getData;
  }
