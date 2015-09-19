stocks.factory('bankService', ['$http', function($http) {


  var bank = { cash: 200000000 };

  var transactions = [];


  return {
    bank: bank,
    transactions: transactions
  };

}]);