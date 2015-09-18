stocks.controller('datePickerCtrl',
  [ '$scope' , 'stocksService', '$filter',
  function ($scope, stocksService, $filter) {

    $scope.dateSelected = stocksService.currentDate;

    $scope.convertToDate = function(input){
      $scope.dateSelected.date = $filter('date')(input, 'yyyy-MM-dd');
    };

    $scope.format = 'yyyy-MM-dd';

    $scope.minDate = new Date("2011-11-11");
    $scope.maxDate = new Date();

    $scope.dtStart = new Date("2014-01-02");
    $scope.dtEnd = new Date("2015-01-01");

    $scope.slider = 1404086400000;

    $scope.sliderProps = {
      start: 1388534400000,
      end: 1419984000000
    }

    $scope.updateStart = function () {
      $scope.sliderProps.start = Date.parse($scope.dtStart);
    }

    $scope.updateEnd = function () {
      $scope.sliderProps.end = Date.parse($scope.dtEnd);
    }

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.status = {
      opened: false
    };

}]);