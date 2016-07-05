var Controllers = angular.module('Controllers', []);
Controllers.controller('MainCtrl',
function($scope, $http, $location, accountService) { // init variables
  $scope.copysource = "";
  $scope.saba_list = ['uss', 'cdb'];
  $scope.saba = [];
  for (var key = 0; key < $scope.saba_list.length; key++) {
    $scope.saba[$scope.saba_list[key]] = [];
    $scope.saba[$scope.saba_list[key]].table_list = [];
    $scope.saba[$scope.saba_list[key]].table_base_selected = [];
    $scope.saba[$scope.saba_list[key]].table_list_selected = [];
    $scope.saba[$scope.saba_list[key]].result_data = [];
  }
  $scope.saba.cdb.table_list_base = ['SALES_DETAIL','SALES_TOTAL','SALES_DMDTO_TOTAL','DMD_DMDTO_TOTAL','CUSTOMER_ID_MNG', 'CONTRACT','ACCA_DAT','ACC_TRANS_ERR_CVS','ADJUST','ALIPAY_DAT','APPLI_RES_MST','APPLI_SEND_DAT','BILL_CUSTOMER','BILL_DETAIL','BILL_DMD','BILL_SHIFT_CONTRACT','BILL_SHIFT_DETAIL','CASHBACK','CASHBACK_MST','CONDITION_MST','CONTRACT_OPT','CPASS_DEMAND_TRANS','CUSTOMER','CUSTOMER_RESERVE','CUSTOMER_SUP','DEMANDTO','DF_REGREFERENCE','DISCOUNT','DISCOUNT_MST','DISC_COMMISSION_OLD_ISP','DISC_ONCE_APPLY','DISC_REL_MNG','DISC_RESERVE','DMD_CUSTOMER_TOTAL','DMD_DMDTO_TOTAL','EA_DAT','EM_BILL_INFO','EM_CONT','EM_DAT','EX_ACCA_DAT','EX_APPLI_SEND_DAT','EX_BILL_CUSTOMER','EX_BILL_DETAIL','EX_BILL_DMD','EX_CASHBACK','EX_CONTRACT','EX_CONTRACT_OPT','EX_CUSTOMER','EX_CUSTOMER_ID_MNG','EX_CUSTOMER_RESERVE','EX_DEMANDTO','EX_DEMANDTO_WK','EX_DISCOUNT','EX_DISCOUNT_MST','EX_DISC_REL_MNG','EX_EA_DAT','EX_EM_CONT','EX_EM_DAT','EX_GOODS_DAT','EX_GOODS_REMAINDER','EX_HBM_DAT','EX_INSTALLMENT_MST','EX_KDDI_CONT','EX_KDDI_CONT_OPT','EX_KDDI_DAT','EX_KDDI_DMD','EX_KDDI_INFO','EX_LF_CONT','EX_LF_DAT','EX_LTE_DAT','EX_NECAT_DAT','EX_NICOS_CARDDB','EX_NTT_DAT','EX_NTT_INFO','EX_NTT_ITEM_DAT','EX_NTT_OSMDB','EX_PLAN_MST','EX_PRIVILEGE','EX_SERVICE','EX_TEPCO_DAT','EX_UNAME_DAT','EX_VOIP_C_DAT','EX_VOIP_F_DAT','EX_VOIP_P_DAT','EX_WIMAX_DAT','EX_XTYLE_INFO','GOODS_DAT','GOODS_REMAINDER','HBM_DAT','KDDI_BILL_REMAINDER','KDDI_COLLECTION_INFO','KDDI_COLLECTION_SUM','KDDI_CONT','KDDI_CONT_OPT','KDDI_DAT','KDDI_DMD','KDDI_INFO','KDDI_LIQUIDATION_INFO','LF_CONT','LF_DAT','LTE_DAT','MV_KDDI_BILL_REMAINDER','MV_NTT_OSMDB','NECAT_DAT','NTT_DAT','NTT_INFO','NTT_ITEM_DAT','NTT_OSMDB','NTT_RESULT','PLAN_MST','PRIVILEGE','SALES_CUSTOMER_TOTAL','SALES_HEADER','SALES_SHIFT_DETAIL','SALES_SHIFT_TOTAL','SERVICE','TEPCO_DAT','TEPCO_OPR_MST','TRANS_RESULT_ERROR_TMP','UNAME_DAT','UPD_CUSTOMER_ID_MNG_TMP','USED_3G_UNLIMITED','VOIP_C_DAT','VOIP_F_DAT','VOIP_P_DAT','VOLUME_DISCOUNT_DAILY','VOLUME_DISCOUNT_MONTHLY','VOLUME_DISCOUNT_MST','WIMAX_DAT','WS_UPDATELOG','WS_BILL_INFO','XTYLE_INFO'];
  $scope.saba.uss.table_list_base = ['customer','contract','option','account_manage','action_reservation','ad','alipay','announce','dialup','dialup_hayabusa','dialup_map','dialup_slot','disc_once_apply','dns_record','global_ip_option','ip_option','lock_id','mail','mail_alias','mail_domain_forward','mail_filter','mail_forward','mail_remail','mail_whitelist','nocustid_leave','online_leave','original_domain','phone','phone_refusal_number','present','serversman','softphone','storage','vps','vps_options','vps_reserve','vps_sync','web'];
  $scope.mst_uss= ['addr_pool','black_list','goods_count','last_login','magic_mail_domain','plan_mst','seq_num','staff_group','staff_group_auth','staff_group_info','staff_info','vps_counter'];
  $scope.mst_cdb= ['BANK_CALENDER_MST','BANK_MST','BILL_HISTORY','BLACK_LIST','BRANCH_MST','BRANCH_WK','BULK_ADJUST','BULK_ADJUST_WK','CONSUMPTION_TAX','DF_HEADRECORD_MST','DIARY','DMD_JOB_MNG','DOMAIN_LST_MST','EXDEMAND_MST','EXDEMAND_WORK','EX_SALES_TOTAL','EX_VOIP_C_NUM_MST','EX_VOIP_F_REF_TELNO_INFO','FL_TARIFF_MST','FL_TRAFFIC_INFO','FUSION_OPR_MST','HBM_BILL_INFO','HIBIT_COLLECTION_INFO','INSTALLMENT_MST','IP_NUM_MST','L2_CALL_LOG','LOGIN_USER','MEASURED_MST','MONITOR','MONTHS','NICOS_CARDDB','NTTF_RESULT_MNG','NTT_COLLECTION_INFO','NTT_EW_MST','NTT_ITEM_MST','NTT_PARTNER_MST','OEM_ID_MST','OLD_ISP_MST','OPERATOR_AUTH_MST','OPERATOR_MST','OPERATOR_TASK_MST','OPT_PLAN_REL_MST','PLAN_CHG_MST','PLAN_REL_MST','PPP_INFO','SALES_DETAIL','SALES_DMDTO_TOTAL','SALES_TOTAL','SALES_TOTAL_DF_COOPERATION','SALES_TOTAL_DF_NG_WK','SALES_TOTAL_DF_NG_WK_HIST','SALES_TOTAL_DF_WK','SALES_TOTAL_DF_WK_HIST','SP_CALL_LOG','SP_CALL_LOG_MNG','STOCKHOLDER_CD_MST','TRAIN_USER','TRANS_MST','TRANS_RESULT_TMP','UNLIMITED_CHARGE_LOG','VOIP_C_NUM_MST','VOIP_C_SIP_MST','VOIP_F_REF_TELNO_INFO','VOIP_INFO'];


  $scope.ctrl_flg = {
    "view_flg": true,
    "pro_flg": false,
    "mst_flg": false,
    "debug_flg": false
  }
  $scope.customer_id_list = ""
  $scope.func = function(table) {
    var aa = true;
    if (typeof(table.filter) == "undefined") {} else {
      if (typeof(table.filter.cond1) != "undefined" && typeof(table.filter.val1) != "undefined" && table.filter.cond1 != "" && table.filter.val1 != "") {
        if (table.data[table.filter.cond1] != table.filter.val1) {
          aa = false;
        }
      }
      if (typeof(table.filter.cond2) != "undefined" && typeof(table.filter.val2) != "undefined" && table.filter.cond2 != "" && table.filter.val2 != "") {
        if (table.data[table.filter.cond2] != table.filter.val2) {
          aa = false;
        }
      }
    }
    return aa; //console.log(e);
    //console.log(f);
  }
  $scope.orderGet = function(table) {
    return table.order;
  };
  $scope.orderStatus = function(table, col) {
    var m_col = '-' + col;
    if (typeof(table.order) == "undefined" || table.order.length == 0) {
      return '0';
    } else if (table.order[1] == m_col || table.order[1] == col) {
      return '1';
    } else if (table.order[0] == col) {
      return '+';
    } else if (table.order[0] == m_col) {
      return '-';
    } else {
      return '0';
    }
  };
  $scope.orderSet = function(table, col) {
    if (typeof(table.order) == "undefined") {
      table.order = [col];
    } else {
      var m_col = '-' + col;
      if (table.order.contains(col)) {
        table.order.deleteElements(col);
        if (table.order.unshift(m_col) > 2) {
          table.order.pop();
        }
      } else if (table.order.contains(m_col)) {
        table.order.deleteElements(m_col);
      } else {
        if (table.order.unshift(col) > 2) {
          table.order.pop();
        }
      }
    }
  };
  $scope.next = function() {
    $scope.custid_list = [];
    $scope.customer_id_list = $scope.customer_id_list.replace(/:+/g, "");
    $scope.customer_id_list = $scope.customer_id_list.replace(/\s+|\n+|\t+|'　'+/g, ",");
    $scope.custid_list = $scope.customer_id_list.split(','); //test


//    $scope.custid_list = ['EK43B254', 'EC12A083'];
//    $scope.saba.cdb.table_list = ['CUSTOMER_ID_MNG', 'CONTRACT']; //test
    get_data($scope.saba_list.clone());
  };
  function get_data(list) {
    if (list.length <= 0) {
      return;
    }
    var sabaname = list.shift();
    $scope.saba[sabaname].result_data = [];
    var data_for_api = {
      "table_list": $scope.saba[sabaname].table_list,
      "customer_id_list": $scope.custid_list
    };
    accountService.events(sabaname, data_for_api).success(function(data) {
      $scope.saba[sabaname].result_data = data;
    }).error(function(data, status, headers, config) {
      console.log("error");
    });
    get_data(list);
  };
  function change_data(data) {
    for (var table = 0; table < data.length; table++) {
      data[table].tmp = [];
      for (var num = 0; num < data[table].data.length; num++) {
        var row = [];
        for (var key = 0; key < data[table].cols.length; key++) {
          row[data[table].cols[key]] = data[table].data[num][key];
        }
        data[table].tmp.push(row);
      }
    }
    return data;
  }; //bth
  $scope.add_table = function(saba) {
    for (var key = 0; key < $scope.saba[saba].table_base_selected.length; key++) {
      if (!$scope.saba[saba].table_list.contains($scope.saba[saba].table_base_selected[key])) {
        $scope.saba[saba].table_list.push($scope.saba[saba].table_base_selected[key]);
      }
    }
  };
  $scope.delete_table = function(saba) {
    for (var key = 0; key < $scope.saba[saba].table_list_selected.length; key++) {
      $scope.saba[saba].table_list.deleteElements($scope.saba[saba].table_list_selected[key]);
    }
    $scope.saba[saba].table_list_selected = [];
  };
  $scope.clear_table = function(saba) {
    $scope.saba[saba].table_list = [];
    $scope.saba[saba].table_list_selected = [];
  };
  var clip = new ZeroClipboard.Client();
  clip.setHandCursor(true);
  clip.addEventListener("mouseOver",
  function(client) {
    client.setText($scope.copysource);
  });
  clip.addEventListener("complete ",
  function(client) { //
  });
  bind(window, "resize",
  function() {
    clip.reposition();
  });
  clip.glue("btn_submit");
  $scope.copy = function() { //head
    $scope.copysource = "\
<html xmlns:o=\"urn:schemas-microsoft-com:office:office\"\
xmlns:x=\"urn:schemas-microsoft-com:office:excel\"\
xmlns=\"http://www.w3.org/TR/REC-html40\">\
<head>\
<meta http-equiv=Content-Type content=\"text/html; charset=utf-8\">\
<meta name=ProgId content=Excel.Sheet>\
<meta name=Generator content=\"Microsoft Excel 12\">\
<style>\
<!--table\
	{mso-displayed-decimal-separator:\"\\.\";\
	mso-displayed-thousand-separator:\"\\,\";}\
tr\
	{mso-height-source:auto;\
	mso-ruby-visibility:none;}\
td\
	{padding:0px;\
	mso-ignore:padding;\
	color:black;\
	font-size:11.0pt;\
	font-weight:400;\
	font-style:normal;\
	text-decoration:none;\
	mso-font-charset:128;\
	mso-number-format:General;\
	text-align:general;\
	vertical-align:middle;\
	border:none;\
	mso-background-source:auto;\
	mso-pattern:auto;\
	mso-protection:locked visible;\
	white-space:nowrap;\
	mso-rotate:0;}\
.xblank\
	{mso-number-format:\"\\@\";}\
.xtablename\
	{font-weight:700;\
	mso-number-format:\"\\@\";}\
.xdetail\
	{mso-number-format:\"\\@\";\
	border:.5pt solid windowtext;}\
.xtitle\
	{font-weight:700;\
	mso-number-format:\"\\@\";\
	border:.5pt solid windowtext;\
	background:#BFBFBF;\
	mso-pattern:black none;}\
\
-->\
</style>\
</head>\
\
<body link=blue vlink=purple>\
\
<table border=0 cellpadding=0 cellspacing=0 style='border-collapse:collapse'>\
<!--StartFragment-->\
";
    for (var name = 0; name < $scope.saba_list.length; name++) {
      var result_data_csv = $scope.saba[$scope.saba_list[name]].result_data.clone(); //orderby
      if ($scope.ctrl_flg.pro_flg) {
        for (var key = 0; key < result_data_csv.length; key++) {
          var aaa = result_data_csv[key].order; //        console.log(result_data_csv[key]['data']);
          result_data_csv[key]['data'].sortby(aaa);
          for (var i = 0; i < result_data_csv[key]['data'].length; i++) {
            if (typeof(result_data_csv[key].filter) != "undefined" && typeof(result_data_csv[key].filter.cond1) != "undefined" && typeof(result_data_csv[key].filter.val1) != "undefined" && result_data_csv[key].filter.cond1 != "" && result_data_csv[key].filter.val1 != "" && result_data_csv[key]['data'][i][result_data_csv[key].filter.cond1].indexOf(result_data_csv[key].filter.val1)) {
              result_data_csv[key]['data'].splice(i, 1);
            }
          }
        }
      }
      if (result_data_csv.length > 0) {
        $scope.copysource += " <tr><td class=xtablename></td><td class=xtablename>" + $scope.saba_list[name] + "</td></tr>";
      } //table
      for (var key = 0; key < result_data_csv.length; key++) {
        $scope.copysource += " <tr><td class=xtablename></td><td class=xtablename>" + result_data_csv[key]['table_name'] + "</td></tr>"; //title
        $scope.copysource += " <tr>  <td class=xtablename></td>"; //cols
        for (var keycol = 0; keycol < result_data_csv[key]['cols'].length; keycol++) {
          $scope.copysource += "<td class=xtitle>" + result_data_csv[key]['cols'][keycol] + "</td>";
        }
        $scope.copysource += " </tr>"; //detail
        for (var keydata = 0; keydata < result_data_csv[key]['data'].length; keydata++) {
          $scope.copysource += " <tr><td class=xblank></td>"; //cols_detail
          for (var keydetail = 0; keydetail < result_data_csv[key]['cols'].length; keydetail++) {
            var colname = result_data_csv[key]['cols'][keydetail];
            $scope.copysource += "<td class=xdetail>" + result_data_csv[key]['data'][keydata][colname] + "</td>";
          }
          $scope.copysource += " </tr>";
        } //blank
        $scope.copysource += "<tr></tr>";
      }
    }
    $scope.copysource += "<!--EndFragment--></table></body></html>"
    var textareaId = document.getElementById('copysource');
    textareaId.focus();
    textareaId.select();
  };
});
