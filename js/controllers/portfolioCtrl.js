stocks.controller('portfolioCtrl',
  [ '$scope' , 'stocksService', 'bankService', 'portfolioService', '$filter',
  function ($scope, stocksService, bankService, portfolioService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    $scope.bank = bankService.bank;

    $scope.transactions = portfolioService.transactions;


  }]
);