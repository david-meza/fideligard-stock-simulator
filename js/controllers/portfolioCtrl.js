stocks.controller('portfolioCtrl',
  [ '$scope' , 'stocksService', 'bankService', 'portfolioService', '$filter',
  function ($scope, stocksService, bankService, portfolioService, $filter) {

    $scope.symbols = stocksService.getSymbols();

    $scope.marketHistory = stocksService.marketHistory;

    $scope.bank = bankService.bank;

    $scope.dateSelected = stocksService.currentDate;

    $scope.transactions = portfolioService.transactions;

    $scope.filteredTransactions = $filter('transactionsFilter')($scope.transactions, $scope.dateSelected.date);

    $scope.compressedPortfolio = {};

    $scope.$watch('dateSelected.date', function( newValue, oldValue) {
      $scope.filteredTransactions = $filter('transactionsFilter')($scope.transactions, newValue)
      resetTotalPortfolio();
      calculateTotalPortfolio();
    })

    var resetTotalPortfolio = function() {
      $scope.compressedPortfolio.costBasis = 0;
      $scope.compressedPortfolio.currentValue = 0;
      $scope.compressedPortfolio.profit = 0;
      $scope.compressedPortfolio.oneDay = 0;
      $scope.compressedPortfolio.oneWeek = 0;
      $scope.compressedPortfolio.oneMonth = 0;
    }


    var calculateTotalPortfolio = function() {
      for (var i = 0; i < $scope.filteredTransactions.length; i++) {
        $scope.compressedPortfolio.costBasis += $scope.filteredTransactions[i].costBasis;
        $scope.compressedPortfolio.currentValue += $scope.filteredTransactions[i].currentValue;
        $scope.compressedPortfolio.profit += $scope.filteredTransactions[i].profit;
        $scope.compressedPortfolio.oneDay += $scope.filteredTransactions[i].oneDay;
        $scope.compressedPortfolio.oneWeek += $scope.filteredTransactions[i].oneWeek;
        $scope.compressedPortfolio.oneMonth += $scope.filteredTransactions[i].oneMonth;
      };
    }

    $scope.currentStockData = portfolioService.currentStockData;


    $scope.sortQuery = 'symbol';
    $scope.reverse = true;
    $scope.selectSort = function(value) {
      console.log("sorting by " + value)
      $scope.reverse = ($scope.sortQuery === value) ? !$scope.reverse : false;
      $scope.sortQuery = value;
    };


  }]
);