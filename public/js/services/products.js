angular.module('MyApp')
  .factory('Products', function($http) {
    return {
      getCategories: function() {
        return $http.get('/api/v1/categories')
      },
      getProducts: function() {
        return $http.get('/api/v1/products')
      },
      getProduct: function(id) {
        var url = `/api/v1/products/${id}`
        return $http.get(url)
      },
      addToCart: function(data) {
        return $http.post('/purchase', data)
      },
      searchProduct: function(query) {
        return $http.get(`/search/?${query}`)
      }
    };
  })
  .service('Session', function () {
    var service = {
      selectedProduct: null
    }
    service.reset = function () {
      this.selectedProduct = null
    }
    service.getProduct = function () {
      return this.selectedProduct
    }
    service.setProduct = function (data) {
      this.selectedProduct = data
    }
    return service
  });
