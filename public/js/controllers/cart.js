angular.module('MyApp')
  .controller('CartCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Cart, Products, Checkout) {
    $scope.init = function() {
      $scope.getCartInfo()
    }

    $scope.getCartInfo = function() {
      Cart.getCartInfo($rootScope.currentUser.id)
       .then(function(response) {
         $scope.cartInfo = response.data
       })
       .catch(function(response) {
         $scope.messages = {
           error: Array.isArray(response.data) ? response.data : [response.data]
         };
       })
    }

    $scope.updateCart = function() {
      Cart.updateCart($scope.cartInfo)
      .then(function(response) {
        $scope.messages = response.data
        $scope.getCartInfo()
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

    $scope.deleteItem = function(item) {
      Cart.deleteCartItem({
        cust: $rootScope.currentUser.id,
        product_id: item.id
      })
        .then(function(response) {
          $scope.updateCart()
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

    $scope.toCheckout = function() {
      if ($scope.cartInfo.itemCount != 0) {
        Checkout.setCartInfo($scope.cartInfo)
        localStorageService.set('cartInfo',$scope.cartInfo)
        $location.path("checkout-address")
      } else {
        window.alert('No Items In Cart')
      }
    }
  });
