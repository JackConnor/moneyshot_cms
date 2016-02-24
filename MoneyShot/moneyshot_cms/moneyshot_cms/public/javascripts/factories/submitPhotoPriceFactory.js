angular.module('submitPhotoPriceFactory', [])

  .factory('submitPrice', submitPrice);

  submitPrice.$inject = ['$http'];

  function submitPrice($http){
    function updatePhoto(photoId, newPrice){
      return $http({
        method: "POST"
        ,url: "http://localhost:5555/api/accepted/photo"
        ,data: {_id: photoId, price: newPrice, status: "sold"}
      })
    }

    return updatePhoto;
  }
