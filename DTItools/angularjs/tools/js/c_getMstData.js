var GetDbDataControllers = angular.module('GetMstDataControllers', []);
GetDbDataControllers.controller('GetMstDataCtrl',
function($scope, $http, $location,getMstDataServices) { // init variables

    $scope.result_data = [];
    $scope.formdata={
	"show_master":"",
	"plan_cd":"",
	"disc_type":"",
	"disc_cd":""
	};
$scope.formdata.show_master="plan" ;

$scope.search2= function() {
	if ($scope.fmst.$invalid){
		$scope.show_err=true;
		return;
	}
	if ($scope.formdata.show_master=="discount" 
		&& is_blank($scope.formdata.plan_cd) 
		&& is_blank($scope.formdata.disc_type) 
		&& is_blank($scope.formdata.disc_cd))
	{
		$scope.aaa="aa";
		return;
	}
    getMstDataServices.events($scope.formdata).success(function(data) {
      $scope.result_data = data;
      $scope.show_err=false;
		$scope.aaa="";
    }).error(function(data, status, headers, config) {
      console.log("error");
    });
  };
});