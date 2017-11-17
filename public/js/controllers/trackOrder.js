function initMap() {}
angular.module('MyApp')
  .controller('TrackOrderCtrl', function($scope, $rootScope, $location, $window, $auth, Products, Session, localStorageService) {
    $scope.var = $rootScope.currentUser;
    $scope.googleMapRequest = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAd3Q644s4HHXat5mvN8xKlyT7pi1A3eYY&callback=initMap"
    // $scope.googleMapRequest = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg";


    console.log(localStorageService.get('trackingInfo').address)
    $scope.address = localStorageService.get('trackingInfo').address//"39831 San Moreno Ct Fremont CA" //localStorageService.get('trackingInfo').address
    // JavaScript source code
    initMap = function() {
//		window.alert("Page popped up");
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var distCalcService = new google.maps.DistanceMatrixService;
    var geocoder = new google.maps.Geocoder;
    var bounds = new google.maps.LatLngBounds;

//    var autocomplete = new google.maps.places.Autocomplete(input, options);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 37.25, lng: -121.775 },

        styles: [
  { elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#FAFAFA' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
  },
  {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
  },
  {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#43A047' }]
  },
  {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
  },
  {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#616161' }]
  },
  {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
  },
  {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
  },
  {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#424242' }]
  },
  {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
  },
  {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
  },
  {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
  },
  {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
  },
  {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#3949AB' }]
  },
  {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
  },
  {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
  }
        ]
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(map,directionsService, directionsDisplay, distCalcService, geocoder, bounds);
    var onChangeHandler = function () {

    };
    // document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(map, directionsService, directionsDisplay, distCalcService, geocoder, bounds) {

    var textResult = '';
    var storeOne = { lat: 37.554260, lng: -122.308524 };
    var storeTwo = { lat: 37.350531, lng: -121.922172 };
    var original;
    var destinational;
    distCalcService.getDistanceMatrix({
        origins: [storeOne, storeTwo],
        destinations: [$scope.address, $scope.address],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;

            var showGeocodedAddressOnMap = function (asDestination) {
                return function (results, status) {
                    if (status === 'OK') {
                        map.fitBounds(bounds.extend(results[0].geometry.location));
                    } else {
                        alert('Geocode was not successful due to: ' + status);
                    }
                };
            };

            var distSM = response.rows[0].elements[0].distance.value;
            var distSJ = response.rows[1].elements[0].distance.value;

            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                //geocoder.geocode({ 'address': originList[i]},showGeocodedAddressOnMap(false));

                //    geocoder.geocode({ 'address': destinationList[0]},showGeocodedAddressOnMap(true));
                    textResult = originList[i] + ' to ' + destinationList[i] + ': ' + results[i].distance.text + ' in ' + results[i].duration.text + ' i = ' + i;

                    // alert(textResult);
                    // alert(results[0].distance.value);

            }

            if (distSM > distSJ)
            {
                original = originList[1];
                destinational = destinationList[1];

                // alert('0 = '+ results[0].distance.value+ '    1 = ' + results[1].distance.value);
                directionsService.route({
                    origin: original,
                    destination: destinational,
                    travelMode: 'DRIVING'
                }, function (response, status) {

                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }
            else
            {
                original = originList[0];
                destinational = destinationList[0];
                // alert('0 = ' + results[0].distance.value + '    1 = ' + results[1].distance.value);

                directionsService.route({
                    origin: original,
                    destination: destinational,
                    travelMode: 'DRIVING'
                }, function (response, status) {

                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }



        }
    });


}


$.getScript($scope.googleMapRequest, function() {

// alert("Script loaded but not necessarily executed.");

});


  });
