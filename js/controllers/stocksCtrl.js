stocks.controller('stocksCtrl',
  [ '$scope' , 'stocksService',
  function($scope, stocksService){

    console.log('controller initiated');
    // $s

    //from stockService
    $scope.stocks = apple.query.results.quote.slice(0, 30);

    $scope.dateSelected = "2014-01-02";

    $scope.convertToDate = function(input){
      console.log('convert to Date fn');
      console.log(input);
      var date = new Date(input);
      $scope.dateSelected = date.toISOString().substring(0,10);
      stocksService.setDate($scope.dateSelected);
    };

    $scope.changeDate = function(inputDate){
      console.log('callback fn');
      $scope.dateSelected = inputDate;
      stocksService.setDate($scope.dateSelected);
    };

    $scope.priceChangeNDays = function(input, stock){
      // debugger
      console.log('inside controller price change');
      console.log('date '+ $scope.dateSelected);
      return stocksService.priceChangeNDays(input, stock);
    };
    //response.query.results.quote
    //array of obj: Date , Symbol

  }]);