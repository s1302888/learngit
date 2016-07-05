<?php
    $saba=$_POST['saba'];
    $ret=1;
    $result_data=array();
    exec ( "ssh root@172.16.67.$saba /opt/tools/unfreeze_printid.pl 2>&1" , $output ,$ret );
    if (!$ret){
        $result_data['sts']='0';
        $file_list = array();
		foreach ($output as $value)
		{
			array_push($file_list,"http://172.16.67.$saba/printfile/".$value);
		}
        $result_data['file_list']=$file_list;
    }else{
        $result_data['msg']="error";
        $result_data['sts']='1';
    }

    echo json_encode($result_data);
?>