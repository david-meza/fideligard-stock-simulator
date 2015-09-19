stocks.controller('portfolioCtrl',
  [ '$scope' , 'stocksService', 'bankService', '$filter',
  function ($scope, stocksService, bankService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    $scope.bank = bankService.bank;

    $scope.transactions = bankService.transactions;


  }]
);