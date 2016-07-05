<?php
    $result_data=array();
    ob_start();
    $cmd="ssh root@192.168.13.243 /opt/tools/stop_tomcat.sh 2>&1";
    passthru($cmd,$result);
    $content_grabbed=ob_get_contents();
    ob_end_clean();
    if($result===0){
        ob_start();
        $cmd="ssh root@192.168.13.243 /opt/tools/start_tomcat.sh 2>&1";
        passthru($cmd,$result);
        $content_grabbed=ob_get_contents();
        ob_end_clean();
        if($result===0){
            $result_data['sts']='0';
        }else{
            $result_data['msg']=$content_grabbed;
            $result_data['sts']='1';
        }
    }else{
        $result_data['msg']=$content_grabbed;
        $result_data['sts']='1';
    }
    echo json_encode($result_data);
?>