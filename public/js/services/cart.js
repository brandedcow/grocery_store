angular.module('MyApp')
  .factory('Cart', function($http) {
    return {
      getCartInfo: function(id) {
        return $http.get(`/order/${id}`)
      }
    }
  })
