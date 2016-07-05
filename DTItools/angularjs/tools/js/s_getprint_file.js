var getPrintFileServices = angular.module('getPrintFileServices', []);
getPrintFileServices.factory('getPrintFileServices',
function($http) {
  var getPrintFile = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/get_print_file.php',
      data: apidata
    }); 
  }
  return {
    getPrintFile: function(apidata) {
      return getPrintFile(apidata);
    }
  };
});
