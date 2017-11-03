angular.module('MyApp')
  .controller('TrackOrderCtrl', function($scope, $rootScope, $location, $window, $auth, Products, Session) {
    $scope.var = $rootScope.currentUser;
    $scope.googleMapRequest = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAd3Q644s4HHXat5mvN8xKlyT7pi1A3eYY&callback=initMap"
    // $scope.googleMapRequest = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg";

    // JavaScript source code
    function initMap() {
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

    var onChangeHandler = function () {
        calculateAndDisplayRoute(map,directionsService, directionsDisplay, distCalcService, geocoder, bounds);
    };
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(map, directionsService, directionsDisplay, distCalcService, geocoder, bounds) {

    var textResult = '';
    var storeOne = { lat: 37.554260, lng: -122.308524 };
    var storeTwo = { lat: 37.350531, lng: -121.922172 }
    directionsService.route({
        origin: storeOne,
        destination: document.getElementById('end').value,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    distCalcService.getDistanceMatrix({
        origins: [storeOne],
        destinations: [document.getElementById('end').value],
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

            for (var i = 0; i < originList.length; i++) {
                var results = response.rows[i].elements;
                geocoder.geocode({ 'address': originList[i] },
                    showGeocodedAddressOnMap(false));
                for (var j = 0; j < results.length; j++) {
                    geocoder.geocode({ 'address': destinationList[j] },
                        showGeocodedAddressOnMap(true));
                    textResult += originList[0] + ' to ' + destinationList[0] + ': ' + results[0].distance.text + ' in ' + results[0].duration.text;
                    alert(textResult);
                }
            }

        }
    });
}





  });
