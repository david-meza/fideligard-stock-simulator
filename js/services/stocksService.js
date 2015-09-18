stocks.factory('stocksService', ['$http', function($http) {

  var obj = {};
  obj.currentDate = "2014-02-01";
  var _index;

  // var stockHistory = apple.query.results.quote;
  var marketHistory = {};

  var symbols = ['GOOG', 'AAPL', 'FB', 'CVC', 'NFLX', 'AMZN', 'PFE', 'MSFT', 'C', 'F', 'NOK'].slice(0, 2);


  //all market data when complete
  var getData = function(idx ,startDate, endDate) {
    return $http.get('http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22' + symbols[idx] + '%22%20and%20startDate%20=%20%22' + (startDate || '2014-01-01') + '%22%20and%20endDate%20=%20%22' + (endDate || '2014-12-31') + '%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=').then(
      function(data) {
        addStockData(data, symbols[idx]);
        addPriceComparison(symbols[idx]);
        // debugger;
      }, function (data) {
        console.log(data)
      });
  };


  // API call to get data
  for (var i = 0; i < symbols.length; i++) {
    getData(i);
  };

  var addStockData = function(data, symbol){
    var sym = symbol;
    marketHistory[sym] = data.data.query.results.quote;
  };

  var addPriceComparison = function(symbol){
    var stock = marketHistory[symbol];
    for (var i = 0; i < stock.length; i++){
      var day = stock[i];
      debugger;
      day.oneDay = obj.priceChangeNDays(symbol, i, 1);
      day.oneWeek = obj.priceChangeNDays(symbol, i, 5);
      day.oneMonth = obj.priceChangeNDays(symbol, i, 22);
    }
    console.log (symbol + " done processing");
  };


  obj.setDate = function(selectedDate){
    console.log(obj.currentDate)
    return obj.currentDate = selectedDate;
  };

  obj.getDate = function(){
    return obj.currentDate;
  };

  // can be optimized later
  var getIndexInData = function(symbol){
    for (var i=0; i < marketHistory[symbol].length; i++){
      if (marketHistory[symbol][i].Date == obj.currentDate){
        return _index = i;
      } else if (marketHistory[symbol][i].Date < obj.currentDate){
        return _index = i-1;
      }
    }
    return _index = 0; //if not found, edge case
  };
 // 30d
  obj.priceChangeNDays = function(symbol, idx, days){
    // getIndexInData(symbol);

    if (idx + days >= marketHistory[symbol].length) return '-';
    return marketHistory[symbol][idx].Open - marketHistory[symbol][idx+days].Open;
  };

  obj.getAllStockData = function(){
    return marketHistory;
    // { symbol: , price, 1d, 7d, 30d}
  };

  obj.getSymbols = function(){
    return symbols;
  }

  return obj;

}]);