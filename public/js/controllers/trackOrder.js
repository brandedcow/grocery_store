function initMap() {}
function animate(index,d) {}
angular.module('MyApp')
  .controller('TrackOrderCtrl', function($scope, $rootScope, $location, $window, $auth, Products, localStorageService) {
    $scope.var = $rootScope.currentUser;
    $scope.googleMapRequest = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAd3Q644s4HHXat5mvN8xKlyT7pi1A3eYY&callback=initMap"
    // $scope.googleMapRequest = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg";
    var distanceTotal, now, currentTimeStamp, orderDate, elapsedTime, distanceTotalInMiles, msToTravelDistance, ratioTripSoFar, startLocation;
    var isSameDay = function(){
      now = new Date();
      currentTimeStamp = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
      orderDate = new Date(localStorageService.get('trackingInfo').order_date)
      // alert($scope.order)
      // console.log(now, currentTimeStamp, "hi", orderDate);
      elapsedTime = now.getTime() - orderDate.getTime() - 70000

    };

    //
    //
    // $scope.order_time = localStorageService.get('trackingInfo').order_date).substring()
    $scope.address = localStorageService.get('trackingInfo').address//"39831 San Moreno Ct Fremont CA" //localStorageService.get('trackingInfo').address
    // JavaScript source code

    var map;
    var directionDisplay;
    var directionsService;
    var stepDisplay;

    var position;
    var marker = [];
    var polyline = [];
    var poly2 = [];
    var poly = null;

    var startLocation = [];
    var endLocation = [];
    var timerHandle = [];


    var speed = 0.000005, wait = 0.2;
    var infowindow = null;

    var myPano;
    var panoClient;
    var nextPanoId;

    var startLoc = new Array();
    startLoc[0] =  { lat: 37.554260, lng: -122.308524 };
    startLoc[1] = { lat: 37.350531, lng: -121.922172 };

    var endLoc = new Array();
    var finalDestination;
    endLoc[0];
    endLoc[1];

    var Colors = ["#FF0000", "#00FF00", "#0000FF"];

    initMap = function() {

      $.getScript("/js/epolys.js", function() {

      // alert("Script loaded but not necessarily executed.");

      });

      infowindow = new google.maps.InfoWindow(
        {
          size: new google.maps.Size(150,50)
        });

        var myOptions = {
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 10,
            center: { lat: 37.45, lng: -122.125 },

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

        var markerA = new google.maps.Marker({
         position: startLoc[0],
         icon:'/pics/store.png',
         map: map,
         title: 'San Mateo Store'
       });

       var markerB = new google.maps.Marker({
        position: startLoc[1],
        icon:'/pics/store.png',
        map: map,
        title: 'San Jose Store'
      });



            setRoutes();


      // setRoutes();
      }


    function createMarker(latlng, label, html) {
    // alert("createMarker("+latlng+","+label+","+html+","+color+")");
        var contentString = '<b>'+label+'</b><br>'+html;
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: '/pics/drone.png',
            title: label,
            zIndex: Math.round(latlng.lat()*-100000)<<5
            });

            marker.myname = label;


        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(contentString);
            infowindow.open(map,marker);
            });
        return marker;
    }

    function setRoutes(){

      finalDestination = $scope.address

      endLoc[0] = finalDestination;
      endLoc[1] = finalDestination;

      address = finalDestination
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
        var markerC = new google.maps.Marker({
         position: results[0].geometry.location,
         icon:'/pics/house.png',
         map: map,
         title:finalDestination
        });
      });

        var directionsDisplay = new Array();
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

                var rendererOptions = {
                    map: map,
                    suppressMarkers : true,
                    preserveViewport: true
                }

                var travelMode = google.maps.DirectionsTravelMode.DRIVING;

                directionsService = new google.maps.DirectionsService();

                if(distSM >distSJ)
                {
                  distanceTotal = distSJ
                  var request = {
                      origin: startLoc[1],
                      destination: endLoc[1],
                      travelMode: travelMode
                  };
                      directionsService.route(request,makeRouteCallback(1,directionsDisplay[1]));
                }
                else
                {
                  distanceTotal = distSM
                  var request = {
                      origin: startLoc[0],
                      destination: endLoc[0],
                      travelMode: travelMode
                  };
                      directionsService.route(request,makeRouteCallback(1,directionsDisplay[1]));
                }


                function makeRouteCallback(routeNum,disp){
                    if (polyline[routeNum] && (polyline[routeNum].getMap() != null)) {
                     startAnimation(routeNum);
                     return;
                    }
                    return function(response, status){

                      if (status == google.maps.DirectionsStatus.OK){

                        var bounds = new google.maps.LatLngBounds();
                        var route = response.routes[0];
                        startLocation[routeNum] = new Object();
                        endLocation[routeNum] = new Object();


                        polyline[routeNum] = new google.maps.Polyline({
                        path: [],
                        strokeColor: '#FFFF00',
                        strokeWeight: 3
                        });

                        poly2[routeNum] = new google.maps.Polyline({
                        path: [],
                        strokeColor: '#FFFF00',
                        strokeWeight: 3
                        });


                        // For each route, display summary information.
                        var path = response.routes[0].overview_path;
                        var legs = response.routes[0].legs;


                        disp = new google.maps.DirectionsRenderer(rendererOptions);
                        disp.setMap(map);
                        disp.setDirections(response);


                        //Markers
                        for (i=0;i<legs.length;i++) {
                          if (i == 0) {
                            startLocation[routeNum].latlng = legs[i].start_location;
                            startLocation[routeNum].address = legs[i].start_address;
                            // marker = google.maps.Marker({map:map,position: startLocation.latlng});

                            marker[routeNum] = createMarker(legs[i].start_location,"start",legs[i].start_address,"green");
                          }
                          endLocation[routeNum].latlng = legs[i].end_location;
                          endLocation[routeNum].address = legs[i].end_address;
                          var steps = legs[i].steps;

                          for (j=0;j<steps.length;j++) {
                            var nextSegment = steps[j].path;
                            var nextSegment = steps[j].path;

                            for (k=0;k<nextSegment.length;k++) {
                                polyline[routeNum].getPath().push(nextSegment[k]);
                                //bounds.extend(nextSegment[k]);
                            }
                          }
                        }

                     }

                     polyline[routeNum].setMap(map);
                     //map.fitBounds(bounds);
                     startAnimation(routeNum);

                } // else alert("Directions request failed: "+status);

              }

              }});
    }

        var lastVertex = 1;
        var stepnum=0;
        var step = 0.268223; // 5; // metres
        var tick = 1; // milliseconds
        var eol= [];
    //----------------------------------------------------------------------
     function updatePoly(i,d) {
     // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
        if (poly2[i].getPath().getLength() > 20) {
              poly2[i]=new google.maps.Polyline([polyline[i].getPath().getAt(lastVertex-1)]);
              // map.addOverlay(poly2)
            }

        if (polyline[i].GetIndexAtDistance(d) < lastVertex+2) {
            if (poly2[i].getPath().getLength()>1) {
                poly2[i].getPath().removeAt(poly2[i].getPath().getLength()-1)
            }
                poly2[i].getPath().insertAt(poly2[i].getPath().getLength(),polyline[i].GetPointAtDistance(d));
        } else {
            poly2[i].getPath().insertAt(poly2[i].getPath().getLength(),endLocation[i].latlng);
        }
     }
    //----------------------------------------------------------------------------

    animate = function(index,d) {
        isSameDay()
       if (d >= eol[index]) {
          marker[index].setPosition(endLocation[index].latlng);
          document.getElementById("statusBar").innerHTML = "<b>Status:</b> <span> Delivered </span>";
          document.getElementById("statusBar").style.backgroundColor = "#bbd";
          return;
       }



        var p = polyline[index].GetPointAtDistance(d);
//       console.log(index);

        distanceTotalInMiles = distanceTotal / 1609.34
        msToTravelDistance = distanceTotalInMiles * 60000
        ratioTripSoFar = elapsedTime / msToTravelDistance
        if(ratioTripSoFar < 0){
          startLocation = 0
        }
        else if(ratioTripSoFar >= 1){
          startLocation = polyline[index].Distance()
        }
        else{
          startLocation = ratioTripSoFar * polyline[index].Distance()
        }

        //map.panTo(p);
        marker[index].setPosition(p);
        updatePoly(index,d);
        if(d <= eol[index]){
          if (d == 0){
            document.getElementById("statusBar").innerHTML = "<b>Status:</b> <span> Preparing Your Order (this should take just under a minute) </span>";
            document.getElementById("statusBar").style.backgroundColor = "lavender";
          }
          else{
            document.getElementById("statusBar").innerHTML = "<b>Status:</b> <span> Currently in Route</span>"
            document.getElementById("statusBar").style.backgroundColor = "#add"
          }

          timerHandle[index] = setTimeout("animate("+index+","+ startLocation +")", tick);
        }

      //  document.getElementById("TimePassed").innerHTML = "<b>Time Passed: </b>"+convertTime(timerHandle[1]*2);
    //    console.log(timerHandle[1]);
    }

    function convertTime(seconds)
    {
    var minutes = convertToMinutes(seconds);

      if(minutes >= 60)
      {
        var hours = Math.round(minutes/60);
        var minutes = minutes%60;
        var result ="\n"+ hours+" hours "+minutes+" minutes";
        return result;
      }

      var result ="\n"+ minutes+" minutes";
      return result;
    }

    function convertToMinutes(seconds)
    {
      seconds = Math.round(seconds/60);
      return seconds
    }
    //-------------------------------------------------------------------------

    function startAnimation(index) {
            isSameDay()
            if (timerHandle[index]) clearTimeout(timerHandle[index]);
            eol[index]=polyline[index].Distance();
            map.setCenter(polyline[index].getPath().getAt(0));
            poly2[index] = new google.maps.Polyline({path: [polyline[index].getPath().getAt(0)], strokeColor:"#FFFF00", strokeWeight:3});
            distanceTotalInMiles = distanceTotal / 1609.34
            msToTravelDistance = distanceTotalInMiles * 60000
            ratioTripSoFar = elapsedTime / msToTravelDistance
            startLocation = 0
            if(ratioTripSoFar < 0){
              startLocation = 0
            }
            else if(ratioTripSoFar >= 1){
              startLocation = polyline[index].Distance()
            }
//          var startLocation = startPoint();
            timerHandle[index] = setTimeout("animate("+index+","+startLocation+")",200);  // Allow time for the initial map display
            // alert(distanceTotal)
    }



$.getScript($scope.googleMapRequest, function() {

// alert("Script loaded but not necessarily executed.");

});




  });
