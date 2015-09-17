stocks.controller('stocksCtrl',
  [ '$scope' , 'stocksService',
  function($scope, stocksService){

    console.log('controller initiated');

    $scope.stocks = [apple.query.results.quote[0]];

    $scope.dateSelected = "2014-01-02";


    $scope.changeDate = function(){
      stocksService.setDate($scope.dateSelected);
    };

    //response.query.results.quote
    //array of obj: Date , Symbol

  }]);