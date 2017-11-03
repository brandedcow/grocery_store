angular.module('MyApp')
  .controller('CheckoutCtrl', function($scope, $rootScope, $location, $window, $auth, Cart, Products) {
    $scope.init = function() {
      $scope.getCartInfo()
    }
    $scope.test='start'

    $scope.tabs = [{
      title:'Address',
      url: 'partials/checkout-1'
    },{
      title:'Delivery',
      url: 'partials/checkout-2'
    },{
      title:'Payment',
      url: 'partials/checkout-3'
    },{
      title:'Review',
      url: 'partials/checkout-4'
    }]

    $scope.currentTab = '/partials/checkout-1'

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url
    }

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl == $scope.currentTab
    }

  });
