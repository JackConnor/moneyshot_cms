angular.module('app.routes', [ 'ngRoute'])

  .config(appRoutes);

  appRoutes.$inject = ['$routeProvider'];
  function appRoutes($routeProvider){
    $routeProvider

    .when('/', {
      templateUrl: 'templates/_home.html'
      ,controller: 'videoCtrl'
      ,controllerAs: 'video'
    })

    .when('/cms', {
      templateUrl: 'templates/_cms.html'
      ,controller: 'cmsCtrl'
      ,controllerAs: 'cms'
    })

    .otherwise('/')
  }
