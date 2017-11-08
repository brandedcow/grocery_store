angular.module('MyApp')
  .controller('CheckoutCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Cart, Checkout, Maps) {
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
      $scope.postAddress()
    }

    $scope.toPayment = function() {
      localStorageService.set('delivery',$scope.delivery)
      $location.path('checkout-payment')
    }

    $scope.toReview = function() {
      $location.path('checkout-payment')
    }


    $scope.selectAddress = function (address) {
      $scope.address = address.description
      localStorageService.set('addressID',address.place_id)
      $scope.predictions = ""
    }

    $scope.addressAutoComplete = function() {
      $scope.query = $scope.address.replace(new RegExp(' ','g'),'_')

      Maps.getAutoComplete($scope.query)
        .then(function(response) {
            $scope.predictions = response.data.json.predictions
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

    $scope.postAddress = function() {
      Maps.postAddress({
        cust: $rootScope.currentUser.id,
        addressID: localStorageService.get('addressID')
      })
        .then(function(response) {
          localStorageService.set('address',response.data.addressID)
          window.alert('Valid Address')
          $location.path('checkout-delivery')
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

    $scope.stripeCallback = function (code, result) {
      if (result.error) {
          window.alert('Error');
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
