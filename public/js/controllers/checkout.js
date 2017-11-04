angular.module('MyApp')
  .controller('CheckoutCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Cart, Checkout) {
    $scope.init = function() {
      $scope.getInfo()
      $scope.checkout = {
        cartInfo: $scope.cartInfo,
        address: $scope.address,
        delivery: $scope.delivery,
        payment: $scope.payment
      }
    }

    $scope.getInfo = function() {
      $scope.cartInfo = localStorageService.get('cartInfo')
      $scope.address = localStorageService.get('address')
      $scope.delivery = localStorageService.get('delivery')
      $scope.payment = localStorageService.get('payment')
    }

    $scope.toDelivery = function() {
      localStorageService.set('address',$scope.address)
      $location.path('checkout-delivery')
    }

    $scope.toPayment = function() {
      localStorageService.set('delivery',$scope.delivery)
      $location.path('checkout-payment')
    }

    $scope.toReview = function() {
      localStorageService.set('payment',$scope.delivery)
      $location.path('checkout-payment')
    }

    $scope.stripeCallback = function (code, result) {
    if (result.error) {
        window.alert('Error' );
    } else {
        window.alert('success! token: ' + result.id);
        Cart.placeOrder(result.id)
          .then(function(response) {

          })
          .catch(function(response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          })
    }
};


  });
