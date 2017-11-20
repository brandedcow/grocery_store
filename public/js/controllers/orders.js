angular.module('MyApp')
  .controller('MyOrdersCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Cart, Products, Checkout, Account) {
    $scope.init = function() {
      $scope.getInfo()
      $scope.orderInfo = localStorageService.get('orderInfo')
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

    $scope.trackPackage = function(data) {
      localStorageService.set('trackingInfo', data)
      $location.path('/track-order')
    }

    $scope.orderDetails = function(data) {
      Cart.getOrder(data.id)
        .then(function(response) {
          localStorageService.set('orderInfo', response.data)
          $location.path('/order-detail')
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }
  });
