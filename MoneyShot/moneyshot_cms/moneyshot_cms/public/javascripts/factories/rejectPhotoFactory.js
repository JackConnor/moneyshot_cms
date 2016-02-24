angular.module('rejectPhotoFactory', [])

  .factory('rejectPhoto', rejectPhoto);

  rejectPhoto.$inject = ["$http"];

  function rejectPhoto($http){

    function sendRejection(photoId){
      return $http({
        method: "POST"
        ,url: "http://localhost:5555/api/reject/photo"
        ,data: {photoId: photoId}
      })
    }

    return sendRejection;
  }
