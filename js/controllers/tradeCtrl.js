stocks.controller('tradeCtrl',
  [ '$scope' , 'stocksService', 'bankService', 'portfolioService', '$stateParams', '$filter',
  function ($scope, stocksService, bankService, portfolioService, $stateParams, $filter) {

    // Initialize models
    $scope.symbols = stocksService.getSymbols();
    $scope.symbol = $stateParams.symbol;
    $scope.bank = bankService.bank;
    $scope.quantity = 1;
    $scope.transaction = "Buy";
    $scope.history = stocksService.getAllStockData();
    $scope.dateSelected = new Date(stocksService.currentDate.date);
    $scope.errors = {};
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
      $scope.errors.messages = [];
      var transaction = {
        symbol: $scope.symbol,
        date: convertToDate($scope.dateSelected),
        type: $scope.transaction,
        quantity: $scope.quantity,
        price: currentPrice,
        total: total,
      }

      if ($scope.transaction === "Buy") {
        if ($scope.bank.cash >= transaction.total) {
          $scope.bank.cash -= transaction.total
        } else {
          return $scope.errors.messages.push("You don't have enough money to buy this!")
        }
      } else if ($scope.transaction === "Sell") {
        // Check if we had this many shares of the symbol
        if (validateSale(transaction)) {
          $scope.bank.cash += total
        } else {
          return $scope.errors.messages.push("Cannot sell stock you don't have at this point in time")
        };
      } else {
        return $scope.errors.messages.push("Not a proper transaction. Did you select an option from the dropdown?")
      };

      portfolioService.transactions.push(transaction)
      console.log(portfolioService.transactions)
    }

    var validateSale = function (transaction) {
      for (var i = 0; i < portfolioService.transactions.length; i++) {
        if (portfolioService.transactions[i].symbol == transaction.symbol &&
            portfolioService.transactions[i].quantity >= transaction.quantity &&
            portfolioService.transactions[i].date < transaction.date)
          return true;
      };
      return false;
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