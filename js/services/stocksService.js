stocks.factory('stocksService', function() {

  var obj = {};
  var _currentDate = "2014-01-02";

  obj.setDate = function(selectedDate){
    _currentDate = selectedDate;
  };

  obj.getDate = function(){
    return _currentDate;
  };

  return obj;

});