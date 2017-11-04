angular.module('MyApp')
  .controller('MyOrdersCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Cart, Products, Checkout) {
    $scope.init = function() {
      $scope.getInfo()
    }

    $scope.getInfo = function() {
      Cart.getOrders($rootScope.currentUser.id)
        .then(function(response) {
          $scope.orderList = response.data
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

  });
