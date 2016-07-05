<?php
    $result_data=array();
    $message=$_POST['message'];
if (!empty($message)){

$filename=date('YmdHis');
try{
$handle = fopen("../message_board/".$filename, "a");
$txt =  date('Y-m-d H:i:s')."     ".$message;
fwrite($handle, $txt."\n");
fclose($handle);
}catch(Exception $e){
	$result_data['sts'] =$e;
}


}
    $result_data['msg']= "test";
    echo json_encode($result_data);
?>