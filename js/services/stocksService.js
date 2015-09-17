stocks.factory('stocksService', function() {

  var obj = {};
  var _currentDate = "2014-11-02";
  var _index;

  var stockHistory = apple.query.results.quote;

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

  getIndexInData();

  return obj;

});