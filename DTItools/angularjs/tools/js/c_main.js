var MainControllers = angular.module('MainControllers', []);
MainControllers.controller('MainCtrl',
function($scope, $http, $location) { // init variables
  //menu列表
  $scope.menus = [
    {
        "key": "getCdbfeUrl",
        "text": "CDBFE连接",
        "tmpl": "getCdbfeUrl.html",
        "init": true
    },
    {
        "key": "deployServer",
        "text": "覆盖代码",
        "tmpl": "deployServer.html",
        "init": true
    },
    {
        "key": "chDocumentRoot",
        "text": "切换USS目录",
        "tmpl": "chDocumentRoot.html",
        "init": true
    },
    {
        "key": "csvCompareTools",
        "text": "版本比较",
        "tmpl": "csvCompareTools.html"
    },
    {
        "key": "changeDate",
        "text": "服务器日期",
        "tmpl": "changeDate.html",
        "init": true
    },
    {
        "key": "getDbData",
        "text": "抽取DB数据",
        "tmpl": "getDbData.html"
    },
    {
        "key": "getMstData",
        "text": "MST表查询",
        "tmpl": "getMstData.html"
    },
    {
        "key": "getVerNo",
        "text": "命令生成",
        "tmpl": "getVerNo.html"
    },
    {
        "key": "getPrintFile",
        "text": "印刷生成",
        "tmpl": "getPrintFile.html"
    },
    {
        "key": "urlList",
        "text": "常用连接",
        "tmpl": "urlList.html"
    }
  ];

  $scope.tag = {
    "getVerNo": false,
    "getCdbfeUrl": true
  }

  $scope.pageShow = function(fun) {
    $scope.tag=[];
    $scope.tag[fun]=true;
  }

});
