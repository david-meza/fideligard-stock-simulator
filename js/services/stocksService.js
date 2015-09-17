stocks.factory('stocksService', ['$http', function($http) {

  var obj = {};
  obj.currentDate = "2014-02-01";
  var _index;

  // var stockHistory = apple.query.results.quote;
  var marketHistory = {};

  var symbols = ['GOOG', 'AAPL', 'FB', 'CVC', 'NFLX', 'AMZN', 'PFE', 'MSFT', 'C', 'F', 'NOK'].slice(0, 2);

  var getData = function(symbol, startDate, endDate) {
    return $http.get('http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22' + symbol + '%22%20and%20startDate%20=%20%22' + (startDate || '2014-01-01') + '%22%20and%20endDate%20=%20%22' + (endDate || '2014-12-31') + '%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=')
  }

  for (var i = 0; i < symbols.length; i++) {
    getData(symbols[i]).then(
      function(data) {
        debugger;
        marketHistory[symbols[i]] = data.data.query.results.quote;
      }, function (data) {
        console.log(data)
      })
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

  obj.priceChangeNDays = function(n, symbol){
    getIndexInData(symbol);

    if (_index - n < 0) return 0;
    return marketHistory[symbol][_index].Open - marketHistory[symbol][_index-n].Open;
  };

  obj.getAllStockData = function(){
    return marketHistory;
    // { symbol: , price, 1d, 7d, 30d}
  };

  return obj;

}]);