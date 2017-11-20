angular.module('MyApp')
  .controller('ManageCtrl', function($scope, $rootScope, $location, $window, $auth, Admin) {
    $scope.init = function () {
      $scope.getProducts()
      $scope.getAccounts()
      $scope.getAddresses()
    }

    $scope.putProducts = function() {
      var data = {
        products: $scope.products
      }
      Admin.putProducts(data)
        .then(function(response){

        })
        .catch(function(response) {
          $scope.messages = response.data
        })
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
