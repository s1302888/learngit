var ChDocumentRootControllers = angular.module('ChDocumentRootControllers', []);
ChDocumentRootControllers.controller('ChDocumentRootCtrl',
function($scope, $http, $location, chDocumentRootServices) { // init variables
  $scope.showResult = 0;
  $scope.saba = "";
  $scope.err_msg="";

  $scope.getDocumentRoot = function(saba) {
    if (saba == $scope.saba) {
      return;
    }
    var param = {"saba": saba};
    $scope.saba = saba;
    chDocumentRootServices.getDocumentRoot(param).success(function(data) {
      $scope.result = data['result'];
      $scope.showResult = 1;
      if ($scope.result=='fbmsign') {
        $scope.type = 'docs';
      }else{
        $scope.type = 'fbm';
      }
      console.log("data = ", data);
    }).error(function(data, status, headers, config) {
      $scope.showResult = 999;
      $scope.err_msg="err 999";
      console.log("data = ", data);
      console.log("status = ", status);
    });
  }
  $scope.setDocumentRoot = function() {
    $scope.showResult = 0;
    var param = {
      "saba": $scope.saba,
      type: $scope.type
    };
    chDocumentRootServices.chDocumentRoot(param).success(function(data) {
      if (data['sts'] == 0) {
        $scope.showResult = 2;
      }else{
        $scope.showResult = 999;
        $scope.err_msg=data['msg'];
      }
      console.log("data = ", data);
    }).error(function(data, status, headers, config) {
      $scope.showResult = 999;
      $scope.err_msg="err 999";
      console.log("data = ", data);
      console.log("status = ", status);
    });
  }
});
