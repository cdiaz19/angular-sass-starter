(function() {
  'use strict';

  angular
    .module('app.main', ['app.core'])
    .config(routesConfiguration);

  /* @ngInject */
  function routesConfiguration($stateProvider) {
    $stateProvider
      .state('main', {
        cache: false,
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as vm'
      })
  }
})();

