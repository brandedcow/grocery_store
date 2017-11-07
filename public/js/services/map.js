angular.module('MyApp')
  .factory('Maps', function($http) {
    return {
      getAutoComplete: function(query) {
        return $http.get(`/address/?input=${query}`)
      },
      postAddress: function(data) {
        return $http.post('/address', data)
      }
    }
  })
