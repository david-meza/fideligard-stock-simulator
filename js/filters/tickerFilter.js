stocks.filter('tickerFilter', function () {
  return function (items, search) {
    if (!search) return items;

    var result = {};
    for (key in items) {
      if (key === search){
        result[key] = items[key];
      }
    };
    return result;
  };
});