stocks.filter('transactionsFilter', ['stocksService', function(stocksService) {
  return function(transactionsArr, maxDate, marketHistory) {

    var filtered = {};

    var filteredAsArr = [];

    for (var i = 0; i < transactionsArr.length; i++) {

      if (transactionsArr[i].date < maxDate) {

        var symbol = transactionsArr[i].symbol;

        var currentPrice = stocksService.getPrice(maxDate, symbol);

        var quan = transactionsArr[i].quantity;

        var currVal = quan * currentPrice;

        if (filtered[symbol]) {

          if (transactionsArr[i].type === "Buy") {
            filtered[symbol].quantity += quan;
            filtered[symbol].costBasis += transactionsArr[i].total;
          } else {
            filtered[symbol].quantity -= quan;
            filtered[symbol].costBasis -= transactionsArr[i].total;
            if (filtered[symbol].quantity < 0) filtered[symbol].quantity = 0;
          };


        } else {
          var cb = (transactionsArr[i].type === "Buy") ? transactionsArr[i].total : -transactionsArr[i].total

          filtered[symbol] = {
            symbol: symbol,
            quantity: quan,
            costBasis: cb,
            oneDay: 0,
            oneWeek: 0,
            oneMonth: 0,
          }
        }

        filtered[symbol].currentPrice = currentPrice;
        filtered[symbol].currentValue = currVal;
        filtered[symbol].profit = currVal - filtered[symbol].costBasis;

      };

    };

    for (key in filtered) {
      filteredAsArr.push(filtered[key]);
    }

    return filteredAsArr;
  };
}]);