stocks.directive('ticker', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var validSymbols = ['GOOG', 'AAPL', 'FB', 'CVC', 'NFLX', 'AMZN', 'PFE', 'MSFT', 'C', 'F', 'NOK'];
      ctrl.$validators.ticker = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (validSymbols.indexOf(modelValue) !== -1) {
          // The ticker is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});