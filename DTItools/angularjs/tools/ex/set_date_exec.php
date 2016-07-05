<?php
    $result_data = array();
    $result_data['sts']='0';
    $date=$_POST['date'];
    $sabas=$_POST['sabas'];
    if (preg_match('/^\d{8}$/',$date)){
        $y = substr($date,0,4);
        $mm = substr($date,4,4);
        $m = substr($date,4,2);
        $d = substr($date,6,2);
        $result_data['today']="$y/$m/$d";
        if (checkdate($m,$d,$y) && strcmp($date,'20000101')>=0 && strcmp($date,'20200101')<=0){
            $result_data['result']=array();
            if(is_array($sabas)){
                foreach($sabas as $saba){
                    $ret=1;
                    exec ( "ssh root@$saba /opt/tools/set_date.sh $y $mm 2>&1" , $output ,$ret );
                    if (!$ret){
                        $result_data['result'][$saba]='0';
                    }else{
                        $result_data['result'][$saba]='1';
                    }
                }
            }
        }elseif(strcmp($date,'20000101')<0){
                $result_data['sts']='1';
                $result_data['msg']='日付小さい';
        }elseif(strcmp($date,'20200101')>0){
                $result_data['sts']='1';
                $result_data['msg']='日付大きい';
        }else{
                $result_data['sts']='1';
                $result_data['msg']='日付不正';
        }
    }else{
        $result_data['sts']='1';
        $result_data['msg']='日付不正';
    }

        echo json_encode($result_data);
?>