var CsvCompareToolsControllers = angular.module('CsvCompareToolsControllers', []);
CsvCompareToolsControllers.controller('CsvCompareToolsCtrl',
function($scope, $http, $location,csvCompareToolsServices) { // init variables

$scope.file1="";
$scope.file2="";
$scope.url="";
$scope.result="";
$scope.showResult=0;

  $scope.get_url = function() {
    if ($scope.csvCompareTools.$error.required) {
      $scope.showResult=202;
      return;
    }
    clear_data();
    var param = {"branch_name":$scope.branch_name,"file_name":$scope.file_name,"rev1":$scope.rev1,"rev2":$scope.rev2};
    csvCompareToolsServices.getCompareUrl(param).success(function(data) {
      if (data['sts'] == 0) {
        $scope.showResult=1;
        $scope.file1=data['file1'];
        $scope.file2=data['file2'];
        $scope.url=data['url'];
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
  };

  function clear_data() {
    $scope.file1="";
    $scope.file2="";
    $scope.url="";
    $scope.result="";
    $scope.showResult=0;
  }
});
