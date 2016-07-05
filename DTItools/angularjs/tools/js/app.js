var myapp = angular.module('myapp', [
  'MainControllers',
  'ngClipboard',
  'GetDbDataControllers',
  'GetVerNoControllers',
  'CsvCompareToolsControllers',
  'ChangeDateControllers',
  'ChDocumentRootControllers',
  'GetCdbfeUrlControllers',
  'DeployServerControllers',
  'getVerNoServices',
  'getDbDataServices',
  'csvCompareToolsServices',
  'changeDateServices',
  'chDocumentRootServices',
  'getCdbfeUrlServices',
  'deployServerServices',
  'GetMstDataControllers',
  'getMstDataServices',
  'messageServices',
  'GetPrintFileControllers',
  'getPrintFileServices'
],
//===============post for php start=============
function($httpProvider) { 
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '',
    name, value, fullSubName, subName, subValue, innerObj, i;
    for (name in obj) {
      value = obj[name];
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  }; // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});
//===============post for php end=============

//===============request loading start=============
myapp.factory('myInjector', ['$q', '$location', '$rootScope',
function($q, $location, $rootScope) {
  return {
    response: function(response) {
      $rootScope.$broadcast('loading', 'end');
      return response;
    },
    request: function(config) {
      $rootScope.$broadcast('loading', 'start');
      return config;
    },
    requestError: function(request) {
      $rootScope.$broadcast('loading', 'start');
      return request;
    },
    responseError: function(response) {
      $rootScope.$broadcast('loading', 'end');
      return response;
    }
  }
}]);
myapp.config(['$httpProvider',
function($httpProvider) {
  $httpProvider.interceptors.push('myInjector');
}]);
//===============request loading end=============

//===============customer url(safe url) start=============
myapp.config(['$compileProvider',
function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|start4web2):/); 
  // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
}]);
//===============customer url(safe url) end=============


myapp.directive('focusMe', ['$timeout', function($timeout) {   //设置光标
  return {
    scope: { trigger: '@focusMe' },
    link: function(scope, element, attrs) {
      scope.$watch('trigger', function(value) {
        if(value === "true") {
          $timeout(function() {
            element[0].focus();
          });
        }
      });
    }
  };
}]).directive('popup', function() {
      return {
          restrict: 'E',
          scope: {
            poptitle: "@",
            closefn: "&",
            show: "=showflg",          // showflg 显示
            backactive: "@",          // backactive背景遮蔽
          }, 
          template:
            "<div style=\" position: absolute;\" ng-show=\"show\" onselectstart=\"return false;\">" + 
            "  <div class=\"popup\" onselectstart=\"return false;\" ng-style=\"style1\">" + 
            "    <strong>{{poptitle}}</strong>" + 
            "    <div class=\"popup_close\"  onselectstart=\"return false;\" ng-click=\"close()\">" + 
            "      <div onselectstart=\"return false;\"  class=\"close_font\">×</div>" + 
            "    </div>" + 
            "  </div>" + 
            "  <div ng-transclude class=\"innerPopup\"   onselectstart=\"return false;\" ng-style=\"style2\">" + 
            "  </div>" + 
            "  <div class=\"loading\" ng-show=\"{{backactive}}=='true'\" onselectstart=\"return false;\" >" + 
            "  <div class=\"innerLoading\" >" + 
            "  </div>" + 
            "  </div>" + 
            "</div>" ,
          replace: true,        // 使用模板替换原始标记 
          transclude: true,
          link: function(scope, element, attrs,ctrl) {
            scope.width=parseInt(attrs.width);
            scope.height=parseInt(attrs.height);
            scope.offsetLeft=element[0].children[0].offsetLeft;
            scope.offsetTop=element[0].children[0].offsetTop;
            scope.by2={x:scope.offsetLeft,y:scope.offsetTop};
            scope.style1={width:scope.width+"px",height:scope.height+"px",left:scope.by2.x+"px",top:scope.by2.y+"px"};
            scope.style2={width:scope.width-20+"px",height:scope.height-35+"px",left:scope.by2.x+10+"px",top:scope.by2.y+30+"px"};

            scope.close=function (){
                scope.closefn();
                scope.show=false;
            }
            element[0].children[0].onmousedown=function(ev){
              var mxy=getMouseP(ev);//获取当前鼠标坐标
              scope.by={x:mxy.x-(scope.offsetLeft),y:mxy.y-(scope.offsetTop)};

              if (ev.target.localName == "div"){
                ev.preventDefault();
              }
              document.onmousemove=function(ev){
                var mxy=getMouseP(ev);
                scope.offsetLeft=scope.by2.x=parseInt(mxy.x-scope.by.x);
                scope.offsetTop=scope.by2.y=parseInt(mxy.y-scope.by.y);
                scope.style1={width:scope.width+"px",height:scope.height+"px",left:scope.by2.x+"px",top:scope.by2.y+"px"};
                scope.style2={width:scope.width-20+"px",height:scope.height-35+"px",left:scope.by2.x+10+"px",top:scope.by2.y+30+"px"};
                scope.$apply();
              };
              document.onmouseup=function(ev){
                if (ev.target.localName == "div") {
                  ev.preventDefault();
                  window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
                this.onmousemove=null;
              }
            }
          }
      }
    }).directive('listBox', function() {
      return {
          restrict: 'E',
          scope: {
            baselist: "=",          // 
            list: "=",          // 
			size: "@",          // 
			width: "@",          // 
          }, 
          template:
            "<div>" + 
            "<div class=\"listbox\">"+
            "  <select name=\"baselist_selected\" ng-dblclick=\"add_list()\" ng-model=\"baselist_selected\"  multiple=\"on\" ng-options=\"t for t in baselist\">"+
            "  </select>"+
            "</div>"+
            "<div class=\"listboxcmd\">"+
            "  <input  type=\"button\" ng-click=\"insert_list()\" value=\"->\" >"+
            "</div>"+
            "<div class=\"listbox\">"+
            "  <select name=\"list_selected\"  ng-dblclick=\"delete_list()\" ng-model=\"list_selected\"  multiple=\"on\" ng-options=\"t for t in list\">"+
            "  </select>"+
            "</div>"+
            "<div class=\"listboxcmd\">"+
            "  <input  type=\"button\" ng-click=\"delete_list()\" value=\"x\" ng-disabled=\"list_selected.length <= 0\">"+
            "  <input  type=\"button\" ng-click=\"clear_list()\" value=\"c\" ng-disabled=\"list.length <= 0\">"+
            "</div>"+
            "<div class=\"clear\"></div>"+
            "</div>",
          replace: true,
          transclude: true,
          link: function(scope, element, attrs,ctrl) {
            scope.baselist_selected = [];
            scope.list_selected = [];
            if (typeof(scope.size)=="undefined"){
                scope.size="15";
            }
            if (typeof(scope.width)=="undefined"){
                scope.width="180px";
            }
            element[0].children[0].children[0].size= element[0].children[2].children[0].size=scope.size;
            element[0].children[0].children[0].style.width = element[0].children[2].children[0].style.width=scope.width;
            scope.add_list = function() {
                if (!scope.list.contains(scope.baselist_selected[0])) {
                  scope.list.push(scope.baselist_selected[0]);
                }
            };
            scope.insert_list = function() {
              var selected=scope.list_selected;
              var index = typeof(selected[0]) == "undefined"? scope.list.length : scope.list.indexOf(selected[0])+1;
              for (var key = 0; key < scope.baselist_selected.length; key++) {
                if (!scope.list.contains(scope.baselist_selected[key])) {
                  scope.list.splice(index,0,scope.baselist_selected[key]);
                  index++;
                }
              }
            };
            scope.delete_list = function(saba) {
              for (var key = 0; key < scope.list_selected.length; key++) {
                scope.list.deleteElements(scope.list_selected[key]);
              }
              scope.list_selected = [];
            };
            scope.clear_list = function(saba) {
              scope.list = [];
              scope.list_selected = [];
            };

          }
      }
    }).directive('loading', function() {     //loading图标
      return {
          restrict: 'E',
          scope: {}, 
          template:
            "<div class='loading' ng-show='loadingflg.length>0' >" + 
            "  <div class='innerLoading'><img ng-src='image/loading.gif'/></div>" + 
            "</div>",
          link: function(scope, element, attrs) {
            scope.loadingflg=[];
            scope.$on('loading', function(d,data) {
              if (data == 'end'){
                scope.loadingflg.pop();
              }else if (data == 'start'){
                scope.loadingflg.push("1");
              }
            });
          }
      }
    }).directive("gotoTop", function ($window) {   //返回顶部
      return {
          restrict: 'E',
          scope: {}, 
          template:
            "<div class='gotoTop' ng-show='st>0' >" + 
            "<a title='返回顶部' ng-click='gotoTop()' ></a>" + 
            "</div>",
          link: function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
              scope.st=$window.scrollY;
              scope.$apply();
            });
            scope.gotoTop=function() {
              $window.scrollTo('0','0');
            }
          }
      }
    }).directive('isdate', function() {
      return {
          restrict: 'A',
          require: 'ngModel',
          link: function(scope, element, attrs,ctrl) {
              var verify = function(input) {
                  // return isDate(input);
                  if (typeof(input)=="undefined") return false;
                  return DateUtil.isDate(input,attrs.isdate);
              };
             ctrl.$parsers.push(function(input) {
                  var validity = verify(input);
                 ctrl.$setValidity('date', validity);
                  return validity ? input : false;
              });
          //   ctrl.$formatters.push(function(input) {
          //        var validity = verify(input);
          //       ctrl.$setValidity('date', validity);
          //        return validity ? input : false;
          //    });
          }
      }
    }).filter('myfilter', function() {  
   return function(input, param1, param2) {
      var aaa=[];
      for (var i=0;i<input.length;i++) {
		  if (typeof(param1) != "undefined" 
			&& typeof(param2) != "undefined" 
			&& param1 != "" 
			&& param2 != "" && input[i][param1].indexOf(param2)){
            continue;
		  }
		  aaa.push(input[i]);
	  }
      return aaa;  
   };  
 });




