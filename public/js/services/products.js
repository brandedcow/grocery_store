angular.module('MyApp')
  .factory('Products', function($http) {
    return {
      getCategories: function() {
        return $http.get('/api/v1/categories')
      },
      getProducts: function() {
        return $http.get('/api/v1/products')
      },
      getProduct: function() {
        return $http.get('/api/v1/products/1')
      },
      addToCart: function(data) {
        return $http.post('/purchase', data)
      }
    };
  })
  .service('productSession', function () {
    var service = {
      selectedProduct: null
    }
    service.getProduct = function () {
      return this.selectedProduct
    }
    service.setProduct = function (data) {
      this.selectedProduct = data
    }
    return service
  });
