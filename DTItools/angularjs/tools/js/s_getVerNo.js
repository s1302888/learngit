var getVerNoServices = angular.module('getVerNoServices', []);
getVerNoServices.factory('getVerNoServices',
function($http) {

  var transform4verNo = function(data, files) {
    var ver_list_tmp = data.replace(/Checking in .*/g, '').replace(/RCS file.*/g, '').replace(/cvs commit: Examining.*/g, '').replace(/sh: nkf: not found/g, '').replace(/Broken Pipe/g, '').replace(/done/g, '').replace(/\/work\/cvs_root\/E1\//g, '').replace(/,v.*/g, '').replace(/\n+/g, '\n').replace(/\n$/g, '').replace(/^\n/g, '').split("\n");
    var ver_list = [];
    while (ver_list_tmp.length > 0) {
      var name = ver_list_tmp.shift();
var no = ver_list_tmp.shift();
	  if (no.indexOf("initial revision") != -1)
	  {
		  no = no.replace(/(initial revision: )(.*)/,
		  function($0, $1, $2) {
			return ("\t" + $2);
		  });
	  }else{
		  no = no.replace(/(new revision: )(.*)(; previous revision: )(.*)/,
		  function($0, $1, $2, $3, $4) {
			return ($4 + "\t" + $2);
		  });
	  }
      var item = {
        "name": name,
        "no": no
      }
      ver_list.push(item);
    }
    var file_list = files.replace(/\n+/g, '\n').replace(/\n$/g, '').replace(/^\n/g, '').split("\n");
    var result = "";
    for (var key = 0; key < file_list.length; key++) {
      for (var i = 0; i < ver_list.length; i++) {
        if (file_list[key].indexOf(ver_list[i].name) != -1) {
          result += ver_list[i].no;
          ver_list.splice(i, 1);
          break;
        }
      }
      result += "\n";
    }
    for (var i = 0; i < ver_list.length; i++) {
      result += ver_list[i].name;
      result += "\n";
    }
    return result;
  }
  var transform4commit = function(data, files) {
    var ver_list_tmp = data.replace(/.*conflict.*/g, '').replace(/Merging differences.*/g, '').replace(/cvs update.*/g, '').replace(/retrieving revision.*/g, '').replace(/RCS file: \/work\/cvs_root\/E1\//g, '').replace(/,v/g, '').replace(/\n+/g, '\n').replace(/\n$/g, '').replace(/^\n/g, '').split("\n");
    var ver_list_m = [];
    var ver_list_a = [];
    for (var key = 0; key < ver_list_tmp.length; key++) {
      if (ver_list_tmp[key].indexOf('U ') == 0) {
        ver_list_a.push(ver_list_tmp[key].replace(/U /g, ''));
      } else {
        ver_list_m.push(ver_list_tmp[key]);
      }
    }
    var result = "add\n";
    result += ver_list_a.join("\n");
    result += "\n";
    result += "mod\n";
    result += ver_list_m.join("\n");
    result += "\n";
    result += "\n\n\n\n";
    result += "add for commit\n";
    result += ver_list_a.join(" ");
    result += "\n";
    result += ver_list_a.join("* ");
    result += "*";
    result += "\n";
    result += "mod for commit\n";
    result += ver_list_m.join(" ");
    result += "\n";
    result += ver_list_m.join("* ");
    result += "*";
    result += "\n";
    result += "\n";
    result += "\n";
    result += "sum\n";
    result += "改修一览多出来的\n";
    var file_list = files.replace(/\n+/g, '\n').replace(/\n$/g, '').replace(/^\n/g, '').split("\n");
    for (var key = 0; key < file_list.length; key++) {
      var exist_flg = 0;
      for (var i = 0; i < ver_list_m.length; i++) {
        if (file_list[key].indexOf(ver_list_m[i]) != -1) {
          exist_flg = 1;
          ver_list_m.splice(i, 1);
          break;
        }
      }
      for (var i = 0; i < ver_list_a.length; i++) {
        if (file_list[key].indexOf(ver_list_a[i]) != -1) {
          exist_flg = 1;
          ver_list_a.splice(i, 1);
          break;
        }
      }
      if (exist_flg == 0) {
        result += file_list[key];
        result += "\n";
      }
    }
    result += "\n";
    result += "merge 多出来的\n";
    result += ver_list_a.join("\n");
    result += ver_list_m.join("\n");
    result += "\n";
    result += "\n";
    result += "冲突文件\n";
    var ver_list_tmp_for_conflict = data.replace(/Merging differences.*/g, '').replace(/cvs update.*/g, '').replace(/retrieving revision.*/g, '').replace(/RCS file: \/work\/cvs_root\/E1\//g, '').replace(/,v/g, '').replace(/\n+/g, '\n').replace(/\n$/g, '').replace(/^\n/g, '').split("\n");
    for (var i = 0; i < ver_list_tmp_for_conflict.length; i++) {
      if (ver_list_tmp_for_conflict[i].indexOf('conflict') != -1) {
        result += ver_list_tmp_for_conflict[i - 1];
        result += "\n";
      }
    }
    return result;
  }
  var makeCmd = function(format, arg_list, replaceFlg) {
    var cmd_list = format.split("\n");
    var result = format;
    var today = DateUtil.dateToStr('yyyyMMDD');
    result = result.replace(eval("/" + replaceFlg + "d/g"), today);
    for (var i = 0; i < arg_list.length; i++) {
      result = result.replace(eval("/" + replaceFlg + (i + 1).toString() + "/g"), arg_list[i]['arg']);
    }
    return result;
  }
  return {
    transform4commit: function(data, files) {
      return transform4commit(data, files);
    },
    transform4verNo: function(data, files) {
      return transform4verNo(data, files);
    },
    makeCmd: function(format, arg_list, replaceFlg) {
      return makeCmd(format, arg_list, replaceFlg);
    }
  };
});
