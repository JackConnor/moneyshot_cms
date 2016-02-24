angular.module('allPhotosFactory', [])

  .factory('allPhotos', allPhotos);

  allPhotos.$inject = ["$http"];

  function allPhotos($http){
    function getPhotos(){
      return $http({
        method: "GET"
        ,url: "http://localhost:5555/api/allPhotos"
      })
    }
    return getPhotos;
  }
