var GetPrintFileControllers = angular.module('GetPrintFileControllers', []);
GetPrintFileControllers.controller('GetPrintFileCtrl',
function($scope, $http, $location, getPrintFileServices) { // init variables
  $scope.showResult = 0;
  $scope.saba = "145";
  $scope.err_msg="";
  $scope.filelist = [];

  $scope.getPrintFile = function() {
    var param = {"saba": $scope.saba};
    getPrintFileServices.getPrintFile(param).success(function(data) {
        if (data['sts'] == 0) {
          $scope.showResult = 1;
          $scope.filelist = data['file_list'];
        } else {
          $scope.showResult = 999;
          $scope.err_msg = data['msg'];
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
