stocks.controller('stocksCtrl',
  [ '$scope' ,
  function($scope){

    $scope.stocks = [];

    $scope.layoutSliderChanged = function (value) {
            console.log(value);
        };
        $scope.layoutStartTimeMS = new Date("2014-01-01");
        $scope.layoutEndTimeMS = new Date("2014-12-31");

  }])