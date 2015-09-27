stocks.directive('portfolioRow', function(){

  return {
    restrict: 'A',
    templateUrl: 'templates/directives/portfolio_row.html',
    scope: {
      stock: '=',
      symbol: '=',
    }
  };

});