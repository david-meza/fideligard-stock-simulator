stocks.factory('portfolioService', function() {

  var transactions = [];

  var generateMockData = function() {
    var symbols = ['GOOG', 'AAPL', 'FB', 'CVC', 'NFLX', 'AMZN', 'PFE', 'MSFT', 'C', 'F', 'NOK'];
    for (var i = 0; i < 50; i++) {
      var transaction = {
        symbol: symbols[Math.floor(Math.random() * 11)],
        date: randomDate(new Date("2012-01-01"), new Date()).toDateString(),
        type: ["Buy", "Sell"][Math.floor(Math.random() * 2)],
        quantity: Math.floor(Math.random() * 10000),
        price: Math.random() * 500 + 50,
        total: Math.random() * 500000,
      }
      transactions.push(transaction);
    };
  }

  var randomDate = function (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  generateMockData();


  return {
    transactions: transactions
  };

})