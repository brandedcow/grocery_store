angular.module('MyApp')
  .controller('DetailCtrl', function($scope, $rootScope, $location, $window, $auth, localStorageService, Session) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.init = function () {
      $scope.test = $rootScope.currentUser
      $scope.selectedProduct = localStorageService.get('selectedProduct')
    }

  });
