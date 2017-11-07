angular.module('MyApp')
  .controller('ProductsCtrl', function($scope, $rootScope, $location, $window, $auth,localStorageService, Products, Session) {
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
        localStorageService.set('selectedProduct', response.data)
        // Session.setProduct(response.data)
      })
      .then(function() {
        $location.path("product-detail")
      })
      .catch(function(response) {
        $scope.messages = {
          msg: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

    $scope.addToCart = function (itemID) {
      var data = {
        customer_id: $rootScope.currentUser.id,
        product_id: itemID,
        quantity: 1
      }

      Products.addToCart(data)
      .then(function(response) {
        $scope.messages = response.data
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })

    }
  });
