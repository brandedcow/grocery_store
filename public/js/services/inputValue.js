angular.module('MyApp')
.service('InputValue', function() {
  var theValue;

  var service = {
   getName: function() { return theValue; },
   setName: function(n) { theValue = n; }
  };
  return service;
});
