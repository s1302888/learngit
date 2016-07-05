var getDbDataServices = angular.module('getDbDataServices', []);
getDbDataServices.factory('getDbDataServices',
function($http) {
    var urllist = {
      "cdb": 'http://192.168.13.244/cgi-bin/select_db_tools.cgi',
      "uss": 'http://172.16.66.160/tools/select_db_tools.cgi'
    }

    var doRequest = function(type,apidata) { 
      var apiUrl= urllist[type];
      if (typeof(apiUrl) == "undefined") {
        apiUrl='http://192.168.13.244/cgi-bin/select_db_tools.cgi';
      }
      return $http({ 
        method: 'POST', 
        url: apiUrl,
      headers: {
        'Content-Type': 'text/plain'
      },
      transformRequest: [function(d) {
      return angular.toJson(d);
      }],
        data: apidata
      }); 
    }

    var addMonths = function(apidata) { 
      return $http({ 
        method: 'POST', 
        url: 'http://192.168.13.244/cgi-bin/add_months.cgi',
      headers: {
        'Content-Type': 'text/plain'
      },
      transformRequest: [function(d) {
      return angular.toJson(d);
      }],
        data: apidata
      }); 
    }
    var addMonths2 = function(apidata) { 
      return $http({ 
        method: 'POST', 
        url: 'http://172.16.66.160/tools/add_months.cgi',
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
      events: function(type,apidata) { return doRequest(type,apidata); },
      add_months: function(apidata) { return addMonths(apidata); },
      add_months2: function(apidata) { return addMonths2(apidata); }
    }; 
});
