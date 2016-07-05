var ChangeDateControllers = angular.module('ChangeDateControllers', []);
ChangeDateControllers.controller('ChangeDateCtrl',
function($scope, $http, $location, changeDateServices) { // init variables
  $scope.saba_list = [{
    saba: '172.16.67.145',
    checked: true
  },
  {
    saba: '172.16.67.146',
    checked: true
  },
  {
    saba: '172.16.66.160',
    checked: true
  },
  {
    saba: '172.16.66.161',
    checked: true
  },
  {
    saba: '192.168.13.243',
    checked: true
  },
  {
    saba: '192.168.13.244',
    checked: true
  }];


  $scope.result_data = {};
  $scope.setDate = function() {
    if ($scope.changeDate.$invalid) {
      $scope.showResult = 202;
      return;
    }
    if (DateUtil.isDate($scope.date, 'yyyyMMdd') != true) {
      $scope.showResult = 999;
      $scope.err_msg = "not date";
      return;
    }
    var sabas = $scope.saba_list.find(function (obj) {
             return obj.checked;
         }).getBy('saba');
    var param = {
      "date": $scope.date,
      "sabas": sabas
    };

    changeDateServices.setDate(param).success(function(data) {
      if (data['sts'] == 0) {
        $scope.showResult = 1;
        $scope.result_data_set = data['result'];
        $scope.getDate();
      } else {
        $scope.showResult = 999;
        $scope.err_msg = data['msg'];
      }
      console.log("data = ", data);
    }).error(function(data, status, headers, config) {
      console.log("data = ", data);
      console.log("status = ", status);
    });
  };

  $scope.getDate = function() {
    var sabas = $scope.saba_list.getBy('saba');
    var param = {
      "sabas": sabas
    };
    changeDateServices.getDate(param).success(function(data) {
      $scope.result_data = data['result'];
      console.log("data = ", data);
    }).error(function(data, status, headers, config) {
      console.log("data = ", data);
      console.log("status = ", status);
    });
  };

  $scope.getDate();
});
