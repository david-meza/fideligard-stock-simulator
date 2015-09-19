stocks.controller('transactionsCtrl',
  [ '$scope' , 'stocksService', 'bankService', 'portfolioService', '$filter',
  function ($scope, stocksService, bankService, portfolioService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    $scope.bank = bankService.bank;

    $scope.transactions = portfolioService.transactions;

    $scope.selectSort = function(value) {
      console.log("sorting by " + value)
      $scope.reverse = ($scope.sortQuery === value) ? !$scope.reverse : false;
      $scope.sortQuery = value;
    };


  }]
);