<?php
    $result_data=array();
    $result_data['sts']='0';
    $msg ="留言板(别玩坏了，没对应过转义)\n";

try{


$dir    = '../message_board/';
$arr=scandir($dir ,1);
foreach ($arr as $value) {

$handle = fopen($dir .$value, "r");
if ($handle) {
while (!feof($handle)) {
$buffer = fgetss ($handle, 4096);
$msg.=$buffer;
}
}
fclose($handle);


}



}catch(Exception $e){
	$result_data['sts'] =$e;
}

    $result_data['msg']= $msg;
    echo json_encode($result_data);
?>