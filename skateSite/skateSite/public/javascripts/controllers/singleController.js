angular.module('singleController', [])

  .controller('singleCtrl', singleCtrl);

  singleCtrl.$inject = ["$http"]

  function singleCtrl($http){
    var self = this;

    console.log('holla');
    self.testDrive = 'Yoooooooo holllla'

  ////////End Single controller
  /////////////////////////////
  /////////////////////////////
  }
