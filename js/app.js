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
    });


  $urlRouterProvider.otherwise('/index');

});

stocks.filter('tickerFilter', function () {
  return function (items, search) {
    if (search === "") return items;

    var result = {};
    for (key in items) {
      if (key === search){
        result[key] = items[key];
      }
    };
    return result;
  };
});


// enable error handling
stocks.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});