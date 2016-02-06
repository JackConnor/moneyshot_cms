angular.module('seedFactory', [])

  .factory('seedFactory', seedFactory);

  seedFactory.$inject = ['$http'];
  function seedFactory($http){
    return ["QU66JJHIT7w", "F7uRCEJHZMw"];
  }
