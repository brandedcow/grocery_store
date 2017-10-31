angular.module('MyApp')
  .factory('Products', function($http) {
    return {
      getCategories: function() {
        return $http.get('/api/v1/categories');
      }
    };
  });
