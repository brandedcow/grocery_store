angular.module('MyApp')
  .controller('ProductsCtrl', function($scope, $rootScope, $location, $window, $auth, Products) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.getCategories = function() {
      Products.getCategories()
        .then(function(response) {
          $scope.categories = response.data
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }
  });
