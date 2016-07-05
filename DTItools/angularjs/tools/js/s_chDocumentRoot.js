var chDocumentRootServices = angular.module('chDocumentRootServices', []);
chDocumentRootServices.factory('chDocumentRootServices',
function($http) {
  var chDocumentRoot = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/chDocumentRoot_exec.php',
      data: apidata
    }); 
  }
  var getDocumentRoot = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/getDocumentRoot_exec.php',
      data: apidata
    }); 
  }
  return {
    chDocumentRoot: function(apidata) {
      return chDocumentRoot(apidata);
    },
    getDocumentRoot: function(apidata) {
      return getDocumentRoot(apidata);
    }
  };
});
