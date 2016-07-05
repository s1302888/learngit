var getMstDataServices = angular.module('getMstDataServices', []);
getMstDataServices.factory('getMstDataServices',
function($http) {
    var doRequest = function(apidata) { 
      return $http({ 
        method: 'POST', 
        url: 'http://192.168.13.244/cgi-bin/select_db_tools_mst.cgi',
      headers: {
        'Content-Type': 'text/plain'
      },
      transformRequest: [function(d) {
      return angular.toJson(d);
      }],
        data: apidata
      }); 
    }
    return { 
      events: function(apidata) { return doRequest(apidata); }
    }; 
});
