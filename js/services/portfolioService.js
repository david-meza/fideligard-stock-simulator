stocks.factory('portfolioService', ['$filter', function($filter) {

  var transactions = [];

  var currentStockData = {};

  var generateMockData = function() {
    var symbols = ['GOOG', 'AAPL', 'FB', 'CVC', 'NFLX', 'AMZN', 'PFE', 'MSFT', 'C', 'F', 'NOK', 'YHOO', 'VLKAY', 'IBB', 'CAT', 'NGD', 'KKR'];
    for (var i = 0; i < 25; i++) {
      var q = Math.floor(Math.random() * 10000)
      var p = Math.random() * 500 + 50
      var transaction = {
        symbol: symbols[Math.floor(Math.random() * 17)],
        date: formattedDate(),
        type: ["Buy", "Sell"][Math.floor(Math.random() * 2)],
        quantity: q,
        price: p,
        total: q * p,
      }
      transactions.push(transaction);
    };
  }

  var randomDate = function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  var formattedDate = function () {
    return $filter('date')( randomDate(new Date("2014-01-01"), new Date("2014-12-31")) , 'yyyy-MM-dd')
  }

  var populateCurrentStocks = function() {

    for (var i = 0; i < transactions.length; i++) {
      // If we had a previous record of trading this Stock in our transactions
      if (currentStockData[transactions[i].symbol]) {
        // If we are buying, add to stock quantity
        if (transactions[i].type === "Buy") {
          currentStockData[transactions[i].symbol].quantity += transactions[i].quantity
        } else {
          currentStockData[transactions[i].symbol].quantity -= transactions[i].quantity
          // Since this is mock data we won't bother too much with validations.
          if (currentStockData[transactions[i].symbol].quantity < 0) currentStockData[transactions[i].symbol].quantity = 0;
        }
        // Store the most recent date (this is overly simplified)
        if (transactions[i].date > currentStockData[transactions[i].symbol].lastTransaction) {
          currentStockData[transactions[i].symbol].lastTransaction = transactions[i].date
        }
      // Otherwise create one
      } else {
        currentStockData[transactions[i].symbol] = {
          lastTransaction: transactions[i].date,
          quantity: transactions[i].quantity
        }
      }

    };
  }

  generateMockData();

  populateCurrentStocks();

  console.log(currentStockData)




  return {
    transactions: transactions,
    currentStockData: currentStockData,
  };

}])