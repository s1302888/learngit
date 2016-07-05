var changeDateServices = angular.module('changeDateServices', []);
changeDateServices.factory('changeDateServices',
function($http) {
  var setDate = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/set_date_exec.php',
      data: apidata
    }); 
  }
  var getDate = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/get_date_exec.php',
      data: apidata
    }); 
  }
  return {
    setDate: function(apidata) {
      return setDate(apidata);
    },
    getDate: function(apidata) {
      return getDate(apidata);
    }
  };
});
