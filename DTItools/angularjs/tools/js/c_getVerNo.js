var GetVerNoControllers = angular.module('GetVerNoControllers', []);
GetVerNoControllers.controller('GetVerNoCtrl',
function($scope, $http, $location, getVerNoServices) { // init variables

  $scope.file_list = "";
  $scope.ver_list = "";
  $scope.arg_list = [{arg: "",note: ""},{arg: "",note: ""},{arg: "",note: ""},{arg: "",note: ""}];
  $scope.replaceFlg = "%";

  $scope.default1 = function() {
	  var arg1=$scope.arg_list[0].arg;
	  var arg2=$scope.arg_list[1].arg;
    $scope.arg_list =[{arg:arg1,note:"1:ブランチ"},{arg:arg2,note:"2:マージ先"},{arg:"",note:"3:マージ後タグ名"}];
    $scope.format = "\
cd /var/source\n\
cvs checkout -r %2 -d %2 E1\n\
cp -r %2 %2_bak\n\
cd /var/source/%2/uss\n\
cvs update -d -j %1 >> /var/cvslog/%d/merge_uss.log 2>&1\n\
cd /var/source/%2/cdbfe\n\
cvs update -d -j %1 >> /var/cvslog/%d/merge_cdbfe.log 2>&1\n\
cd /var/source/%2/customer\n\
cvs update -d -j %1 >> /var/cvslog/%d/merge_customer.log 2>&1\n\
************commit\n\
cd /var/source/%2\n\
cvs tag %3\n\
cd /var/source\n\
cvs checkout -r %3 -d %3 E1\n\
tar -cvf %3.tar %3\n\
tar -cvf %2_bak.tar %2_bak";
  };

  $scope.default2 = function() {
	  var arg1=$scope.arg_list[0].arg;
	  var arg2=$scope.arg_list[1].arg;
    $scope.arg_list =[{arg:arg1,note:"1:ブランチ"},{arg:arg2,note:"2:ブランチ先"},{arg:"",note:"3:filelist"},{arg:"",note:"4:filelist for ls"}];
    $scope.format = "\
cd /var/source/%2\n\
ls %3 |awk '{system(\"cp \"$0\" \"$0\".bak\")}'\n\
ls -l %4\n\
cvs update -A %3\n\
ls %3 |awk '{system(\"mv \"$0\".bak \"$0)}'\n\
ls -l %4\n\
cvs commit -m \"merge %1\" %3 >> /var/cvslog/%d/commit_customer.log 2>&1";
  };

  $scope.default3 = function() {
	  var arg1=$scope.arg_list[0].arg;
	  var arg2=$scope.arg_list[1].arg;
    $scope.arg_list =[{arg:arg1,note:"1:ブランチ"},{arg:arg2,note:"2:ブランチ先"},{arg:"",note:"3:filelist"}];
    $scope.format = "\
cd /var/source/E1/cdbfe      or       cd /var/source/E1/customer\n\
cvs update -d -j %1 %3\n\
cvs commit -m \"merge %1\" %3  >> /var/cvslog/%d/commit_customer.log 2>&1\n\
cd /var/source/%2/cdbfe        or      cd /var/source/%2/customer\n\
rm %3\n\
cvs update -A %3\n\
cvs update -A %3";
  };

  $scope.clear = function() {
    $scope.arg_list =[{arg:"",note:""}];
    $scope.format = "";
  };

  $scope.add_argument = function() {
    $scope.arg_list.push({arg: "",note: ""});
  };

  $scope.delete_argument = function() {
    $scope.arg_list.pop();
  };

  $scope.make_cmd = function() {
    $scope.result = getVerNoServices.makeCmd($scope.format, $scope.arg_list, $scope.replaceFlg);
  };
  $scope.transform4commit = function() {
    $scope.result = getVerNoServices.transform4commit($scope.ver_list,$scope.file_list);
  };
  $scope.get_ver_no = function() {
    $scope.result = getVerNoServices.transform4verNo($scope.ver_list,$scope.file_list);
  };

  $scope.default2();
});
