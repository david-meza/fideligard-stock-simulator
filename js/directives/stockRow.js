stocks.directive('stockRow', function(){

  return {
    restrict: 'A',
    templateUrl: 'templates/directives/stock_row.html',
    scope: {
      stock: '=',
    }
  };

});