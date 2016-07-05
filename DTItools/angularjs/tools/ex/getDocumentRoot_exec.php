<?php
$saba = $_POST["saba"];
if ($saba != "161"){
    $saba = "160";
}
$result_data=array();
            $output="";
            exec ( "ssh root@172.16.66.$saba cat /etc/httpd/conf/httpd.conf  |grep '^ *DocumentRoot '" , $output );
            $regex = '/fbmsign/';
            $str = $output[0];
            $matches = array();
            if(preg_match($regex, $str, $matches)){
                        $result_data['result']= "fbmsign";
            }else{
                        $result_data['result']= "normal";
            }

echo json_encode($result_data);
?>