angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $rootScope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.admin = $rootScope.isAdmin
    $scope.isAdmin = function () {
      if ($rootScope.isAdmin === 1){
        return true
      } else {
        return false
      }
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {
      $auth.logout();
      delete $rootScope.currentUser
      delete $rootScope.isAdmin
      delete $window.localStorage.user;
      $location.path('/');
    };
  });
