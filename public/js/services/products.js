angular.module('MyApp')
  .factory('Products', function($http) {
    return {
      getCategories: function() {
        return $http.get('/api/v1/categories')
      },
      getByCategory: function(id) {
        return $http.get(`/category/${id}`)
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
