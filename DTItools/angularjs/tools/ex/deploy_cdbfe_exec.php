<?php
    $result_data=array();
    $server_name=escapeshellarg ($_POST['server_name']);
    $branch_name=escapeshellarg ($_POST['branch_name']);
    ob_start();
    $cmd="ssh root@192.168.13.243 /opt/tools/deploy_cdbfe.sh $branch_name $server_name 2>&1";
    passthru($cmd,$result);
    $content_grabbed=ob_get_contents();
    ob_end_clean();
    if($result===0){
        $result_data['sts']='0';
    }else{
        $result_data['msg']=$content_grabbed;
        $result_data['sts']='1';
    }
    echo json_encode($result_data);
?>