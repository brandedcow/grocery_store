angular.module('MyApp')
  .controller('CheckoutCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Account, Cart, Checkout, Maps) {
    $scope.init = function() {
      $scope.paid = false
      $scope.getInfo()
      $scope.getAddresses()
      localStorageService.set('delivery_date', new Date()) // return UT
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
      if (localStorageService.get('chargeData') != undefined) {
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
      localStorageService.set('address', row.address)
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
            localStorageService.set('addressID',response.data.addressID)
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
            address: localStorageService.get('addressID'),
            amount: localStorageService.get('cartInfo').total
          }
          localStorageService.set('chargeData', data)
          $location.path('checkout-review')
      }
    };

    $scope.placeOrder = function() {
        eta()
    }





    $scope.var = $rootScope.currentUser;
    $scope.googleMapRequest = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAd3Q644s4HHXat5mvN8xKlyT7pi1A3eYY&callback=initMap"
    // $scope.googleMapRequest = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg";
    var distanceTotal, now, currentTimeStamp, orderDate, elapsedTime, distanceTotalInMiles, msToTravelDistance, ratioTripSoFar, startLocation;
    var isSameDay = function(){
      now = new Date(); // returned PST
      currentTimeStamp = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
      orderDate = new Date(localStorageService.get('trackingInfo').order_date)
      // alert($scope.order)
      // console.log(now, currentTimeStamp, "hi", orderDate);
      elapsedTime = now.getTime() - orderDate.getTime() - 70000

    };

    //
    //
    // $scope.order_time = localStorageService.get('trackingInfo').order_date).substring()
    $scope.address = localStorageService.get('address')//('trackingInfo').address//"39831 San Moreno Ct Fremont CA" //localStorageService.get('trackingInfo').address
    // JavaScript source code


    var startLoc = new Array();
    startLoc[0] =  { lat: 37.554260, lng: -122.308524 };
    startLoc[1] = { lat: 37.350531, lng: -121.922172 };

    var endLoc = new Array();
    var finalDestination;
    endLoc[0];
    endLoc[1];



    function eta(){
      var time_of_delivery = 0;
      finalDestination = $scope.address

      endLoc[0] = finalDestination;
      endLoc[1] = finalDestination;

      address = finalDestination
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        var markerC = new google.maps.Marker({
         position: results[0].geometry.location,
         icon:'/pics/house.png',
         title:finalDestination
        });
      });

        var distCalcService = new google.maps.DistanceMatrixService;
        distCalcService.getDistanceMatrix({
            origins: [startLoc[0], startLoc[1]],
            destinations: [$scope.address, $scope.address],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false},function(response, status)
            {
              if (status !== 'OK') {
                  alert('Error was: ' + status);
              } else {
                var distSM = response.rows[0].elements[0].distance.value;
                var distSJ = response.rows[1].elements[0].distance.value;



                var travelMode = google.maps.DirectionsTravelMode.DRIVING;

                directionsService = new google.maps.DirectionsService();

                // If San Jose is closer
                if(distSM >distSJ)
                {
                  distanceTotal = distSJ
                }
                // If San Mateo is closer

                else
                {
                  distanceTotal = distSM
                }
                distanceTotalInMiles = distanceTotal / 1609.34
                msToTravelDistance = distanceTotalInMiles * 60000
                now = new Date(Date.now() + msToTravelDistance)
                date = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());


                time_of_delivery = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()



                var data = localStorageService.get('chargeData')
                data['delivery_date'] = time_of_delivery
                console.log(data)
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


              }});
    }


$.getScript($scope.googleMapRequest, function() {

// alert("Script loaded but not necessarily executed.");

});














  });
