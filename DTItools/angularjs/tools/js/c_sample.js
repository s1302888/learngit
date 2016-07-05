var MainControllers = angular.module('SampleControllers', []);
SampleControllers.controller('SampleCtrl',
function($scope, $http, $location) { // init variables
  $scope.ctrl_flg = {
    "view_flg": true,
    "pro_flg": false,
    "mst_flg": false,
    "debug_flg": true
  }
  $scope.tag = {
    "getVerNo": false,
    "true": true
  }
});
