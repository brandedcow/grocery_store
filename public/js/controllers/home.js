angular.module('MyApp')
  .controller('HomeCtrl', function($scope, $rootScope, $location, $window, $auth, Cart, Products) {
    $scope.searchProduct = function() {
      Products.searchProduct(`name=${$scope.item}`)
        .then(function(response) {
          $scope.results = response.data
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }
  });
