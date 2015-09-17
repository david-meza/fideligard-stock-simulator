stocks.factory('stocksService', ['$http', function($http) {

  var obj = {};
  var _currentDate = "2014-11-02";
  var _index;

  var stockHistory = apple.query.results.quote;
  var marketHistory = {};

  var symbols = ['GOOG', 'AAPL', 'FB', 'CVC', 'NFLX', 'AMZN', 'PFE', 'MSFT', 'C', 'F', 'NOK'];

  var getData = function(symbol, startDate, endDate) {
    return $http.get('http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22' + symbol + '%22%20and%20startDate%20=%20%22' + (startDate || '2013-12-01') + '%22%20and%20endDate%20=%20%22' + (endDate || '2015-08-31') + '%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=')
  }

  // for (var i = 0; i < symbols.length; i++) {
  //   getData(symbols[i]).then(
  //     function(data) {
  //       debugger;
  //       marketHistory[symbols[i]] = data.query.results.quote;
  //     }, function (data) {
  //       console.log(data)
  //     })
  // };


  obj.setDate = function(selectedDate){
    _currentDate = selectedDate;
    // getIndexInData();
  };

  obj.getDate = function(){
    return _currentDate;
  };

  // can be optimized later
  var getIndexInData = function(){
    for (var i=0; i< stockHistory.length; i++){
      if (stockHistory[i].Date == _currentDate){
        return _index = i;
      } else if (stockHistory[i].Date < _currentDate){
        return _index = i-1;
      }
    }
    return _index = 0; //if not found, edge case
  };

  obj.priceChangeNDays = function(n, stock){
    _currentDate = stock.Date;
    getIndexInData();

    if (_index-n < 0) return 0;
    return stockHistory[_index].Open - stockHistory[_index-n].Open;
  };

  obj.getAllStockData = function(){
    return marketHistory;

    // { symbol: , price, 1d, 7d, 30d}


  };

  getIndexInData();

  return obj;

}]);