angular.module('MyApp')
  .factory('Admin', function($http) {
    return {
      getProducts: function() {
        return $http.get('/admin/products')
      },
      getAccounts: function() {
        return $http.get('/admin/accounts')
      },
      getAddresses: function() {
        return $http.get('/admin/addresses')
      },
    }
  })
