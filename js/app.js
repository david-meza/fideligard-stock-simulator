stocks = angular.module("stocks", ['ui.router', 'ui.bootstrap'] );

stocks.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('app', {
      url: '/',
      views: {
        'navbar': {
          templateUrl: 'templates/partials/navbar.html'
        },

        'content': {
          templateUrl: 'templates/partials/content.html'
        },

        'footer': {
          templateUrl: 'templates/partials/footer.html'
        },

      },
    })

    .state('app.simulator', {
      url: 'simulator',
      views: {
        'content@': {
          templateUrl: "templates/simulator.html"
        },

        'dateFilter@app.simulator': {
          templateUrl: "templates/partials/date_filter.html",
          controller: 'datePickerCtrl'
        },

        'stocks@app.simulator': {
          templateUrl: "templates/partials/stocks.html",
          controller: 'stocksCtrl'
        }

      }
    })

    .state('app.simulator.portfolio', {
      url: '/portfolio',
      templateUrl: "templates/portfolio.html",
      controller: 'portfolioCtrl'
    })

    .state('app.simulator.trade', {
      url: '/trade/:symbol',
      templateUrl: "templates/trade.html",
      controller: 'tradeCtrl'
    })

    .state('app.simulator.transactions', {
      url: '/transactions',
      templateUrl: "templates/transactions.html",
      controller: 'transactionsCtrl'
    })


  $urlRouterProvider.otherwise('/app.simulator.transactions');

});


// enable error handling
stocks.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});