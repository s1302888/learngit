var csvCompareToolsServices = angular.module('csvCompareToolsServices', []);
csvCompareToolsServices.factory('csvCompareToolsServices',
function($http) {
  var getCompareUrl = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/cvs_tools_diff_exec.php',
      data: apidata
    }); 
  }
  return {
    getCompareUrl: function(apidata) {
      return getCompareUrl(apidata);
    }
  };
});
