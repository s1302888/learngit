var GetCdbfeUrlControllers = angular.module('GetCdbfeUrlControllers', []);
GetCdbfeUrlControllers.controller('GetCdbfeUrlCtrl',
function($scope, $http, $location,getCdbfeUrlServices,messageServices) { // init variables

    $scope.getMessage = function() {

        messageServices.get().success(function(data) {
          console.log("data = ", data);
          $scope.message_board=data.msg;
        }).error(function(data, status, headers, config) {
          $scope.showResult = 999;
          $scope.err_msg="err 999";
          console.log("data = ", data);
          console.log("status = ", status);
        });
    }
    $scope.result = [];
    getCdbfeUrlServices.getCdbfeUrl().success(function(data) {
      if (data['sts'] == 0) {
        $scope.showResult = 1;
        var url_list = data['list'];
        for (var key = 0; key < url_list.length; key++) {
          var item = [];
          var url = url_list[key].split(",");
          item['url'] = url['0'];
          item['back'] = url['1'];
          $scope.result.push(item);
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

    $scope.getMessage();

    $scope.chat = function() {
        var param = {
          "message": $scope.message
        };
        messageServices.add(param).success(function(data) {
            $scope.message="";
            $scope.getMessage();
            console.log("data = ", data);
        }).error(function(data, status, headers, config) {
          $scope.showResult = 999;
          $scope.err_msg="err 999";
          console.log("data = ", data);
          console.log("status = ", status);
        });

    }
});
