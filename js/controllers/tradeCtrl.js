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

    $scope.currentStockData = portfolioService.currentStockData;

    var currentPrice = 0;
    var total = 0;


    $scope.getTotal = function () {

      return total = currentPrice * $scope.quantity;

    }

    $scope.getPrice = function () {
      return currentPrice = stocksService.getPrice(convertToDate($scope.dateSelected), $scope.symbol);
    }

    $scope.cashAfter = function () {

      if ($scope.transaction === "Buy") {
        return $scope.bank.cash - total
      } else {
        return $scope.bank.cash + total;
      };

    }

    $scope.afford = function () {
      if ($scope.transaction === "Buy") {
        return $scope.affordable = (total < $scope.bank.cash);
      };
      return $scope.affordable = true;
    }

    var convertToDate = function(input){
      return $filter('date')(input, 'yyyy-MM-dd');
    };

    $scope.processForm = function () {
      // Reset errors array
      $scope.errors.messages = [];
      var transaction = makeTransaction();

      processTransaction(transaction);

      console.log(portfolioService.transactions)
    }

    // var validateSale = function (transaction) {
    //   for (var i = 0; i < portfolioService.transactions.length; i++) {
    //     if (portfolioService.transactions[i].symbol == transaction.symbol &&
    //         portfolioService.transactions[i].quantity >= transaction.quantity &&
    //         portfolioService.transactions[i].date < transaction.date)
    //       return true;
    //   };
    //   return false;
    // }

    var makeTransaction = function() {
      return {
        symbol: $scope.symbol,
        date: convertToDate($scope.dateSelected),
        type: $scope.transaction,
        quantity: $scope.quantity,
        price: currentPrice,
        total: total,
      };
    }

    var processTransaction = function (t) {
      console.log("Before transaction we have...")
      console.log(portfolioService.currentStockData)
      // If we already possess some of this stock...
      if (portfolioService.currentStockData[t.symbol]) {
        if (t.type === "Buy") {
          // Check if we can afford it
          if ($scope.bank.cash >= t.total) {
            $scope.bank.cash -= t.total;
            portfolioService.currentStockData[t.symbol].quantity += t.quantity;
            portfolioService.currentStockData[t.symbol].lastTransaction = t.date;
          } else {
            return $scope.errors.messages.push("You don't have enough money to buy this!")
          }
        } else if (t.type === "Sell") {
          // Check if we had this many shares of the symbol
          if (portfolioService.currentStockData[t.symbol].quantity >= t.quantity) {
            $scope.bank.cash += t.total
            portfolioService.currentStockData[t.symbol].quantity -= t.quantity
          } else {
            return $scope.errors.messages.push("You don't have enough of this stock to sell")
          };
        } else {
          return $scope.errors.messages.push("Not a proper transaction. Did you select an option from the dropdown?")
        };
      } else {
      // If it's a completely new stock...
        if (t.type === 'Buy') {
          if ($scope.bank.cash >= t.total) {
            $scope.bank.cash -= t.total;
            portfolioService.currentStockData[t.symbol] = {
              lastTransaction: t.date,
              quantity: t.quantity
            };
          } else {
            return $scope.errors.messages.push("You don't have enough money to buy this!")
          }
        } else {
          return $scope.errors.messages.push("You cannot sell stock you never bought!");
        }

      }

      portfolioService.transactions.push(transaction)

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