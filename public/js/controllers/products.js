angular.module('MyApp')
  .controller('ProductsCtrl', function($scope, $rootScope, $location, $window, $auth, Products, Session) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.init = function () {
      $scope.test = "start"
      $scope.getCategories()
      $scope.getProducts()
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

    $scope.getProduct = function(itemID) {
      $scope.test = "getProduct" + itemID

      Products.getProduct(itemID)
      .then(function(response) {
        Session.reset()
        Session.setProduct(response.data)
      })
      .then(function() {
        $location.path("product-detail")
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
