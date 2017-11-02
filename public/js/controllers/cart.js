angular.module('MyApp')
  .controller('CartCtrl', function($scope, $rootScope, $location, $window, $auth, Cart, Products) {
    $scope.init = function() {
      $scope.getCartInfo()
    }

    $scope.getCartInfo = function() {
      Cart.getCartInfo($rootScope.currentUser.id)
       .then(function(response) {
         $scope.cartInfo = response.data
         $scope.cartInfo.items = Array.from($scope.cartInfo.items)
         $scope.cartInfo.items.forEach(function(item) {
           var temp = {
             id: item.id,
             name: null,
             quantity: item.quantity,
             price: 0,
             weight: 0,
           }
           Products.getProduct(item.id)
            .then(function(response) {
              temp.name = response.data.name
              temp.price = response.data.price
              temp.weight = response.data.weight
              $scope.cartInfo.total += (temp.price * temp.quantity)
              $scope.cartInfo.totalWeight += Math.round(temp.weight * temp.quantity)
              $scope.cartInfo.items.shift()
              $scope.cartInfo.items.push(temp)
            })

         })
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
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

  });
