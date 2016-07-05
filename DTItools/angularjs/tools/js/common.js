
//Array.find函数用法
// var arr = [{ id: 1, name: "aa" }, { id: 2, name: "bb" }, { id: 3, name: "cc"}];
//         var a2 = arr.find(function (obj) {
//             return obj.id > 1;
//         });
//         alert(a2.length);
Array.prototype.find = function (func) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
        if (func(this[i])) {
            temp[temp.length] = this[i];
        }
    }
    return temp;
}

//Array.getBy函数用法
// var arr = [{ id: 1, name: "aa" }, { id: 2, name: "bb" }, { id: 3, name: "cc"}];
//         var a2 = arr.getBy('name');
//         a2: ["aa","bb","cc"]
Array.prototype.getBy = function (key) {
    var temp = [];
    for (var i = 0; i < this.length; i++) {
            temp[temp.length] = this[i][key];
    }
    return temp;
}

//判断某元素是否在数组内
// [1,2,3].contains(2) TRUE
// [1,2,3].contains(4) FALSE
Array.prototype.contains = function(obj) { 
  var i = this.length; 
  while (i--) { 
    if (this[i] === obj) { 
      return true; 
    } 
  } 
  return false; 
} 

//删除数组内的某元素
// [a,c,d,b].deleteElements('d')
// return [a,c,b]
Array.prototype.deleteElements = function(obj) { 
  var i = this.length; 
  while (i--) { 
    if (this[i] === obj) {
      this.splice(i,1);
    }
  }
} 

Array.prototype.clone = function(){
  return this.concat();
}

            //深复制对象方法  
         function cloneObj (obj) {  
                var newO = {};  
  
                if (obj instanceof Array) {  
                    newO = [];  
                }  
                for (var key in obj) {  
                    var val = obj[key];  
                    newO[key] = typeof val === 'object' ? arguments.callee(val) : val;  
                }  
                return newO;  
            };  

Array.prototype.sortby = function(key){
      this.sort(function(a,b){
        if (typeof(key) == "undefined" ||key.length == 0){
          return 0;
        }
        for (var i=0;i<key.length;i++) {
          var descending = 1;
          var c=key[i];
            if ((c.charAt(0) == '+' || c.charAt(0) == '-')) {
              if (c.charAt(0) == '-')
              {
                descending = -1;
              }
              c = c.substring(1);
            }
          if(a[c]>b[c]){
            return 1*descending;  
          }else if(a[c]<b[c]){  
            return -1*descending;  
          }else{  
            if (key.length == 0)
            {
              return 0;
            }
          }
        }
      }); 
}


function is_blank(d){
	if (typeof(d)=="undefined" || d==null || d=="")
	{
		return true;
	}
		return false;
}



function json2xml(o, tab) {  
   var toXml = function(v, name, ind) {  
      var xml = "";  
      if (v instanceof Array) {  
         for (var i=0, n=v.length; i<n; i++)  
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";  
      }  
      else if (typeof(v) == "object") {  
         var hasChild = false;  
         xml += ind + "<" + name;  
         for (var m in v) {  
            if (m.charAt(0) == "@")  
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";  
            else  
               hasChild = true;  
         }  
         xml += hasChild ? ">" : "/>";  
         if (hasChild) {  
            for (var m in v) {  
               if (m == "#text")  
                  xml += v[m];  
               else if (m == "#cdata")  
                  xml += "<![CDATA[" + v[m] + "]]>";  
               else if (m.charAt(0) != "@")  
                  xml += toXml(v[m], m, ind);  
            }  
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";  
         }  
      }  
      else {  
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";  
      }  
      return xml;  
   }, xml="";  
   for (var m in o)  
      xml += toXml(o[m], m, "");  
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");  
}
