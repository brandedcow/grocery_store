angular.module('MyApp')
  .controller('CheckoutCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Account, Cart, Checkout, Maps) {
    $scope.init = function() {
      $scope.getInfo()
      $scope.getAddresses()
      $scope.selectedExisting = false;
    }

    $scope.getAddresses = function() {
      Account.getAddresses($rootScope.currentUser.id)
        .then(function(response){
          $scope.addresses = response.data
        })
        .catch(function(response){
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          }
        })
    }

    $scope.getInfo = function() {
      $scope.cartInfo = localStorageService.get('cartInfo')
      if ($scope.cartInfo.totalWeight > 15) {
        $scope.overWeight = true
      }
      if ($scope.cartInfo.totalWeight > 30) {
        $scope.superOverWeight = true
      }
      $scope.address = localStorageService.get('address')
      $scope.delivery = localStorageService.get('delivery')
      if (localStorageService.get('chargeData') != null) {
        $scope.paid = true
      }
    }

    $scope.toDelivery = function() {
      $scope.postAddress()
    }

    $scope.toPayment = function() {
      localStorageService.set('delivery',$scope.delivery)
      if ($scope.superOverWeight) {
        window.alert('Cart too heavy, exceeds allowable weight of 30lbs.')
        return
      }
      if ($scope.overWeight && $scope.delivery != 'doubledrone') {
        window.alert('Cart too heavy, use two drones')
        return
      }
      $location.path('checkout-payment')
    }

    $scope.toReview = function() {
      $location.path('checkout-review')
    }

    $scope.selectExistingAddress = function(row) {
      $scope.selectedExisting = true;
      $scope.address = row.address
      localStorageService.set('address', address.description)
      localStorageService.set('addressID',row.id)
      $scope.prediction = ""
    }

    $scope.selectAddress = function (address) {
      $scope.selectedExisting = false;
      $scope.address = address.description
      localStorageService.set('address', address.description)
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
      if ($scope.selectedExisting === true) {
        $location.path('checkout-delivery')
      } else {
        Maps.postAddress({
          cust: $rootScope.currentUser.id,
          addressID: localStorageService.get('addressID')
        })
          .then(function(response) {
            window.alert('Valid Address')
            $location.path('checkout-delivery')
          })
          .catch(function(response) {
            $scope.messages = {
              error: Array.isArray(response.data) ? response.data : [response.data]
            };
          })
      }

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
          localStorageService.remove('address')
          localStorageService.remove('delivery')
          localStorageService.remove('chargeData')
          localStorageService.remove('cartInfo')
          $location.path('my-orders')
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

  });
