var getCdbfeUrlServices = angular.module('getCdbfeUrlServices', []);
getCdbfeUrlServices.factory('getCdbfeUrlServices',
function($http) {
  var getCdbfeUrl = function() {
    return $http({ 
      method: 'POST', 
      url: 'ex/get_cdbfe_url.php'
    }); 
  }
  return {
    getCdbfeUrl: function() {
      return getCdbfeUrl();
    }
  };
});
