stocks.factory('stocksService', function() {

  var obj = {};
  var _currentDate = "2014-12-02";
  var _index;

  var stockHistory = apple.query.results.quote;

  obj.setDate = function(selectedDate){
    _currentDate = selectedDate;
  };

  obj.getDate = function(){
    return _currentDate;
  };

  // can be optimized later
  var getIndexInData = function(){
    for (var i=0; i< stockHistory.length; i++){
      if (stockHistory[i].Date == _currentDate){
        return i;
      } else if (stockHistory[i].Date > _currentDate){
        return i-1;
      }
    }
    return 0; //if not found, edge case
  };

  obj.priceChangeNDays = function(n){
    var index = getIndexInData();
    if (index-n < 0) return 0;
    return stockHistory[index].Open - stockHistory[index-n].Open;
  };

  return obj;

});