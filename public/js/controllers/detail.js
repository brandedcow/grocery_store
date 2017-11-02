angular.module('MyApp')
  .controller('DetailCtrl', function($scope, $rootScope, $location, $window, $auth, Session) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.init = function () {
      $scope.test = "start detail"
      $scope.selectedProduct = Session.getProduct()
    }

  });
