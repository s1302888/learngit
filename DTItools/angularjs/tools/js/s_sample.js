var sampleServices = angular.module('sampleServices', []);
sampleServices.factory('sampleServices',
function($http) {
  var fn1 = function(data, files) {
    result=data+files;
    return result;
  }
  var fn2 = function(data, files) {
    result=data+files;
    return result;
  }
  return {
    fn1: function(a, b) {
      return fn1(a, b);
    },
    fn2: function(a, b) {
      return fn2(a, b);
    }
  };
});
