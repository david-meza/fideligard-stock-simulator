stocks.controller('portfolioCtrl',
  [ '$scope' , 'stocksService', 'bankService', 'portfolioService', '$filter',
  function ($scope, stocksService, bankService, portfolioService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    $scope.bank = bankService.bank;

    $scope.transactions = portfolioService.transactions;

    $scope.currentStockData = portfolioService.currentStockData;


    $scope.sortQuery = 'symbol';
    $scope.reverse = true;
    $scope.selectSort = function(value) {
      console.log("sorting by " + value)
      $scope.reverse = ($scope.sortQuery === value) ? !$scope.reverse : false;
      $scope.sortQuery = value;
    };


  }]
);