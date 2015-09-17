stocks.controller('stocksCtrl',
  [ '$scope' , 'stocksService',
  function($scope, stocksService){

    console.log('controller initiated');

    $scope.stocks = apple.query.results.quote;

    $scope.dateSelected = "2014-01-02";


    $scope.changeDate = function(){
      stocksService.setDate($scope.dateSelected);
    };

    $scope.priceChangeNDays = function(input){
      // debugger
      console.log('inside controller price change');
      console.log('input: '+ input);
      return stocksService.priceChangeNDays(input);
    };
    //response.query.results.quote
    //array of obj: Date , Symbol

  }]);