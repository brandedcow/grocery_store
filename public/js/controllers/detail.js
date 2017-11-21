angular.module('MyApp')
  .controller('DetailCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Products) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.addToCart = function (itemID) {
      var data = {
        customer_id: $rootScope.currentUser.id,
        product_id: itemID,
        quantity: 1
      }

      Products.addToCart(data)
      .then(function(response) {
        $scope.messages = response.data
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }


    $scope.init = function () {
      $scope.test = $rootScope.currentUser
      $scope.selectedProduct = localStorageService.get('selectedProduct')
    }

  });
