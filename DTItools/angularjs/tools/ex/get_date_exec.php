<?php
    $result_data = array();
    $sabas=$_POST['sabas'];
    $result_data['result']=array();
    if(is_array($sabas)){
        foreach($sabas as $saba){
            $saba_date=array();
            $output=array();
            exec ( "ssh root@$saba date '+%Y/%m/%d'" , $output );
            $saba_date['saba']=$saba;
            $saba_date['date']=$output[0];
            array_push($result_data['result'],$saba_date);
        }
    }
echo json_encode($result_data);
?>