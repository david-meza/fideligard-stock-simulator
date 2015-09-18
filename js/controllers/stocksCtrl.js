stocks.controller('stocksCtrl',
  [ '$scope' , 'stocksService', '$filter',
  function ($scope, stocksService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    $scope.history = stocksService.getAllStockData();

    $scope.dateSelected = stocksService.currentDate;

    $scope.priceChangeNDays = function(input, stock){
      return stocksService.priceChangeNDays(input, stock);
    };

  }]);