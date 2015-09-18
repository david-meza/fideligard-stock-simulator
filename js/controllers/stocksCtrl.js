stocks.controller('stocksCtrl',
  [ '$scope' , 'stocksService', '$filter',
  function($scope, stocksService, $filter){

    console.log('controller initiated');

    $scope.stocksService = stocksService;
    $scope.symbols = stocksService.getSymbols();

    $scope.history = stocksService.getAllStockData();
    $scope.dateSelected = stocksService.currentDate;

    $scope.$watch('stocksService.currentDate', function(newVal, oldVal) {
      console.log('date has changed')
      $scope.dateSelected = stocksService.getDate();
    })

    $scope.convertToDate = function(input){
      stocksService.setDate($filter('date')(input, 'yyyy-MM-dd'));
    };

    // $scope.changeDate = function(inputDate){
    //   console.log('callback fn');
    //   $scope.dateSelected = inputDate;
    //   stocksService.setDate($scope.dateSelected);
    // };

    $scope.priceChangeNDays = function(input, stock){
      // debugger
      console.log('inside controller price change');
      console.log('date '+ $scope.dateSelected);
      return stocksService.priceChangeNDays(input, stock);
    };

  }]);