stocks = angular.module("stocks", ['ui.router'] );

stocks.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('index', {
      url: '/index',
      views: {
        'dateFilter': {
          templateUrl: "templates/date_filter.html",
          controller: 'stocksCtrl'
        },

        'stocks': {
          templateUrl: "templates/stocks.html",
          controller: 'stocksCtrl'
        },

        'portfolio': {
          templateUrl: "templates/portfolio.html",
          controller: 'stocksCtrl'
        }

      }
    })


  $urlRouterProvider.otherwise('/index')

})


// enable error handling
stocks.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});