stocks.directive('transactionRow', function(){

  return {
    restrict: 'A',
    templateUrl: 'templates/directives/transaction_row.html',
    scope: {
      transaction: '=',
    }
  };

});