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
      $location.path('checkout-payment')
    }

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
          window.alert('Error' );
      } else {
          window.alert('Valid Payment');
          var data = {
            customer_id:$rootScope.currentUser.id,
            token: result.id,
            address: localStorageService.get('address'),
            amount: localStorageService.get('cartInfo').total
          }
          localStorageService.set('chargeData', data)
          $location.path('checkout-review')
      }
    };
    $scope.placeOrder = function() {
      var data = localStorageService.get('chargeData')
      Cart.placeOrder(data)
        .then(function(response) {
          $location.path('my-orders')
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

  });
