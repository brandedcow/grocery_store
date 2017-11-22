angular.module('MyApp')
  .controller('MainController', function($scope, $rootScope, $location, $window, $auth, localStorageService, Account, Cart, Checkout, Maps) {
    $scope.address = localStorageService.get('trackingInfo').address

  });
