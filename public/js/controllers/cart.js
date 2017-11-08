angular.module('MyApp')
  .controller('CartCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Cart, Products, Checkout) {
    $scope.init = function() {
      $scope.getCartInfo()
    }

    $scope.getCartInfo = function() {
      Cart.getCartInfo($rootScope.currentUser.id)
       .then(function(response) {
         $scope.cartInfo = response.data
         localStorageService.set('cartInfo',$scope.cartInfo)
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
      var temp = Cart.updateCart($scope.cartInfo)
      .then(function(response) {
        $scope.messages = response.data
        return Cart.getCartInfo($rootScope.currentUser.id)

      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })

      temp.then(function(response) {
         $scope.cartInfo = response.data
         localStorageService.set('cartInfo',$scope.cartInfo)
         if ($scope.cartInfo.itemCount != 0) {
           $location.path("checkout-address")
         } else {
           window.alert('No Items In Cart')
         }
       })
       .catch(function(response) {
         $scope.messages = {
           error: Array.isArray(response.data) ? response.data : [response.data]
         };
       })


    }
  });
