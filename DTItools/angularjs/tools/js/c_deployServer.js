var deployServerControllers = angular.module('DeployServerControllers', []);
deployServerControllers.controller('DeployServerCtrl',
function($scope, $http, $location, deployServerServices,getCdbfeUrlServices) { // init variables
$scope.list={
	"172.16.67.145":"172.16.66.160",
	"172.16.67.146":"172.16.66.161",
	"192.168.13.244":"172.16.66.160"
};
$scope.getCdbfeUrl = function() {
  $scope.felist=[];
  getCdbfeUrlServices.getCdbfeUrl().success(function(data) {
    if (data['sts'] == 0) {
      var url_list = data['list'];
      for (var key = 0; key < url_list.length; key++) {
        var url = url_list[key].split(",");
        var name = url['0'].replace(/http:\/\/192.168.13.243\//g, '').replace(/\/UserAction\/login\.do/g, '');
        if (name == 'cdbfe'){
          continue;
        }
        $scope.felist.push(name);
      }
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
  $scope.delete = function() {
      if ($scope.del_list.length == 0 ) {
        $scope.showResult = 202;
        return;
      }
      var param = {
        "branch_name": $scope.del_list
      };
      deployServerServices.delCdbfe(param).success(function(data) {
          $scope.showResult = 1;
          $scope.getCdbfeUrl();
        console.log("data = ", data);
        console.log("aaa = ", data);
      }).error(function(data, status, headers, config) {
        console.log("data = ", data);
        console.log("status = ", status);
      });
  }
  $scope.restart_tomcat = function() {
      deployServerServices.restart_tomcat().success(function(data) {
        if (data['sts'] == 0) {
          $scope.showResult = 1;
        } else {
          $scope.showResult = 999;
          $scope.err_msg = data['msg'];
        }
        console.log("data = ", data);
      }).error(function(data, status, headers, config) {
        console.log("data = ", data);
        console.log("status = ", status);
      });
  }

  $scope.server = '172.16.67.145';
  $scope.type = 'customer';
  $scope.deploy = function() {
    if ($scope.deployServer.$invalid) {
      $scope.showResult = 202;
      return;
    }
    var param = {
      "branch_name": $scope.branch_name,
      "server_name": $scope.server
    };
    if ($scope.type == 'cdbfe') {
      deployServerServices.deployCdbfe(param).success(function(data) {
        if (data['sts'] == 0) {
          $scope.showResult = 1;
          $scope.getCdbfeUrl();
        } else {
          $scope.showResult = 999;
          $scope.err_msg = data['msg'];
        }
        console.log("data = ", data);
      }).error(function(data, status, headers, config) {
        console.log("data = ", data);
        console.log("status = ", status);
      });
    } else if ($scope.type == 'customer') {
      deployServerServices.deployCustomer(param).success(function(data) {
        if (data['sts'] == 0) {
          $scope.showResult = 1;
        } else {
          $scope.showResult = 999;
          $scope.err_msg = data['msg'];
        }
        console.log("data = ", data);
      }).error(function(data, status, headers, config) {
        console.log("data = ", data);
        console.log("status = ", status);
      });
    } else if ( $scope.type == 'uss')
    {
      param["server_name"] = $scope.list[$scope.server];
      deployServerServices.deployUss(param).success(function(data) {
        if (data['sts'] == 0) {
          $scope.showResult = 1;
        } else {
          $scope.showResult = 999;
          $scope.err_msg = data['msg'];
        }
        console.log("data = ", data);
      }).error(function(data, status, headers, config) {
        console.log("data = ", data);
        console.log("status = ", status);
      });
    }
  }
  $scope.getCdbfeUrl();
});
