angular.module('MyApp')
  .controller('ManageCtrl', function($scope, $rootScope, $location, $window, $auth, Admin) {
    $scope.init = function () {
      $scope.getProducts()
      $scope.getAccounts()
      $scope.getAddresses()
    }

    $scope.getProducts = function() {
      Admin.getProducts()
        .then(function(response){
          $scope.products = response.data
        })
        .catch(function(response){
          $scope.messages = response.data
        })
    }
    $scope.getAccounts = function() {
      Admin.getAccounts()
        .then(function(response){
          $scope.accounts = response.data
        })
        .catch(function(response){
          $scope.messages = response.data
        })
    }
    $scope.getAddresses = function() {
      Admin.getAddresses()
        .then(function(response){
          $scope.addresses = response.data
        })
        .catch(function(response){
          $scope.messages = response.data
        })
    }
  });
