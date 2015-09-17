stocks.directive('stockRow', function(){

  return {
    restrict: 'A',
    templateUrl: 'js/directives/stock-row.html',
    scope: {
      stock: '=',
      oneDay: '&',
      oneWeek: '&',
      oneMonth: '&',
    }
  };

});