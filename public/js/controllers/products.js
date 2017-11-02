angular.module('MyApp')
  .controller('ProductsCtrl', function($scope, $rootScope, $location, $window, $auth, Products, productSession) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.init = function () {
      $scope.getCategories()
      $scope.getProducts()
      $scope.selectedProduct = productSession.getProduct()
    }

    $scope.getCategories = function() {
      Products.getCategories()
        .then(function(response) {
          $scope.categories = response.data
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

    $scope.getProducts = function() {
      Products.getProducts()
      .then(function(response) {
        $scope.products = response.data
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

    $scope.selectedProduct = "reset"

    $scope.getProduct = function(itemID) {
      Products.getProduct(itemID)
      .then(function(response) {
        productSession.setProduct(response.data)
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

    // $scope.addToCart = function () {
    //   Products.addToCart()
    //   .then(function(response) {
    //     $scope.products = response.data
    //   })
    //   .catch(function(response) {
    //     $scope.messages = {
    //       error: Array.isArray(response.data) ? response.data : [response.data]
    //     };
    //   })
    //
    // }
  });
