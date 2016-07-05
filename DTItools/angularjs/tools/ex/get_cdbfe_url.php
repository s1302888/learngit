<?php
    $ret=1;
    $result_data=array();
    exec ( "ssh root@192.168.13.243 /opt/tools/get_cdbfe_url.sh" , $output ,$ret );
    if (!$ret){
        $result_data['sts']='0';
        $result_data['list']= $output;
    }else{
        $result_data['msg']=$output[0];
        $result_data['sts']='1';
    }
    echo json_encode($result_data);
?>