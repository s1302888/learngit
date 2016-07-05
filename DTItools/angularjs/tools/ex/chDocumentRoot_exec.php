<?php
    $saba=$_POST['saba'];
    $type=escapeshellarg ($_POST['type']);
    $ret=1;
    $result_data=array();
    exec ( "ssh root@172.16.66.$saba /opt/tools/chDocumentRoot.sh $type 2>&1" , $output ,$ret );
    if (!$ret){
        $result_data['sts']='0';
    }else{
        $result_data['msg']=$output[0];
        $result_data['sts']='1';
    }

    echo json_encode($result_data);
?>