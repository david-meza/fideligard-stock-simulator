stocks.controller('tradeCtrl',
  [ '$scope' , 'stocksService', 'bankService', '$stateParams', '$filter',
  function ($scope, stocksService, bankService, $stateParams, $filter) {

    // Initialize models
    $scope.symbols = stocksService.getSymbols();
    $scope.symbol = $stateParams.symbol;
    $scope.bank = bankService.bank;
    $scope.quantity = 1;
    $scope.transaction = "buy";
    $scope.history = stocksService.getAllStockData();
    $scope.dateSelected = stocksService.currentDate.date;
    var currentPrice = 0;
    var total = 0;

    $scope.getTotal = function () {
      return total = currentPrice * $scope.quantity;
    }

    $scope.getPrice = function () {
      return currentPrice = stocksService.getPrice(convertToDate($scope.dateSelected), $scope.symbol);
    }

    $scope.afford = function () {
      return (total < $scope.bank.cash);
    }

    var convertToDate = function(input){
      return $filter('date')(input, 'yyyy-MM-dd');
    };

    $scope.processForm = function () {
      var transaction = {
        symbol: $scope.symbol,
        date: convertToDate($scope.dateSelected)
        type: $scope.transaction
        quantity: $scope.quantity,
        price: currentPrice,
        total: total
      }

      if ($scope.transaction === "buy") {
        $scope.bank.cash -= total
      } else if ($scope.transaction === "sell") {
        // Check if we had this many shares of the symbol
        $scope.bank.cash += total
      } else {
        return console.log("Not a proper transaction")
      };

      bankService.transactions.push(transaction)
    }


    // Date picker config and validations
    $scope.minDate = new Date("2010-01-01");
    $scope.maxDate = new Date();
    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };
    $scope.open = function($event) {
      $scope.status.opened = true;
    };
    $scope.status = {
      opened: false
    };

  }]
);