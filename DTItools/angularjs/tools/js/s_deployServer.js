var deployServerServices = angular.module('deployServerServices', []);
deployServerServices.factory('deployServerServices',
function($http) {
  var deployCdbfe = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/deploy_cdbfe_exec.php',
      data:apidata
    }); 
  }
  var deployCustomer = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/deploy_customer_exec.php',
      data:apidata
    }); 
  }
  var deployUss = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/deploy_uss_exec.php',
      data:apidata
    }); 
  }
  var delCdbfe = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/del_cdbfe_exec.php',
      data:apidata
    }); 
  }
  var restart_tomcat = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/restart_tomcat_exec.php'
    }); 
  }
  return {
    deployCdbfe: function(apidata) {
      return deployCdbfe(apidata);
    },
    deployCustomer: function(apidata) {
      return deployCustomer(apidata);
    },
    deployUss: function(apidata) {
      return deployUss(apidata);
    },
    delCdbfe: function(apidata) {
      return delCdbfe(apidata);
    },
    restart_tomcat: function() {
      return restart_tomcat();
    }
  };
});