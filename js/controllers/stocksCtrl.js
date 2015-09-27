stocks.controller('stocksCtrl',
  [ '$scope' , 'stocksService',
  function ($scope, stocksService) {

    $scope.symbols = stocksService.getSymbols();

    $scope.history = stocksService.getAllStockData();

    $scope.dateSelected = stocksService.currentDate;

    $scope.priceChangeNDays = function(input, stock){
      return stocksService.priceChangeNDays(input, stock);
    };

    $scope.sortQuery = 'Symbol';
    $scope.reverse = true;
    $scope.selectSort = function(value) {
      console.log("sorting by " + value)
      $scope.reverse = ($scope.sortQuery === value) ? !$scope.reverse : false;
      $scope.sortQuery = value;
    };

  }]
);