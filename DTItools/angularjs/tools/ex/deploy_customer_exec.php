<?php
    $result_data=array();
    $server_name=$_POST['server_name'];
    $branch_name=escapeshellarg ($_POST['branch_name']);
    
    ob_start();
    $cmd="ssh root@$server_name /opt/tools/deploy_customer.sh $branch_name 2>&1";
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