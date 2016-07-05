var messageServices = angular.module('messageServices', []);
messageServices.factory('messageServices',
function($http) {
  var get = function() {
    return $http({ 
      method: 'POST', 
      url: 'ex/get_message.php'
    }); 
  };
  var add = function(apidata) {
    return $http({ 
      method: 'POST', 
      url: 'ex/add_message.php',
      data: apidata
    }); 
  };
  return {
    get: function() {
      return get();
    },
    add: function(apidata) {
      return add(apidata);
    }
  };

});
