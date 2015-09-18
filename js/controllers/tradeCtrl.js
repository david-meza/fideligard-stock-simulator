stocks.controller('tradeCtrl',
  [ '$scope' , 'stocksService', '$filter',
  function ($scope, stocksService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    var initalizeCash = function () {
      $scope.bank = 500000000
    }


  }]
);