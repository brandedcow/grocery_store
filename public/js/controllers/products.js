angular.module('MyApp')
  .controller('ProductsCtrl', function($scope, $rootScope, $location, $window, $auth,localStorageService, Products, Session, InputValue) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated()
    };

    $scope.init = function () {
      $scope.getCategories()
      $scope.getProducts()
      $scope.item = localStorageService.get('search')
      $scope.searchProduct()
      localStorageService.set('search', '')
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

    $scope.getByCategory = function (id) {
      Products.getByCategory(id)
        .then(function(response) {
          $scope.results = response.data
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
        $scope.results = $scope.products

      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

    $scope.getProduct = function(itemID) {
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
        window.alert('Added to Cart')
      })
      .catch(function(response) {
        $scope.messages = {
          error: Array.isArray(response.data) ? response.data : [response.data]
        };
      })
    }

    $scope.searchProduct = function() {
      Products.searchProduct(`name=${$scope.item}`)
        .then(function(response) {
          $scope.results = response.data
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    }

    $scope.setInitSearchValue = function() {
      localStorageService.set('search',$scope.item)
    }

    $scope.goToProductsPage = function() {
      $location.path("/products")
    }
  });
