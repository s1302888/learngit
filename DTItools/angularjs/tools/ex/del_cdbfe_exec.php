<?php
    $result_data=array();
    $result_data['result']=array();
    $branch_names=$_POST['branch_name'];
    if(is_array($branch_names)){
        foreach($branch_names as $branch_name){
            ob_start();
            $cmd="ssh root@192.168.13.243 /opt/tools/del_branch.sh $branch_name 2>&1";
            passthru($cmd,$result);
            $content_grabbed=ob_get_contents();
            ob_end_clean();
            $rtn_data=array();
            if($result===0){
                $rtn_data['sts']='0';
            }else{
                $rtn_data['msg']=$content_grabbed;
                $rtn_data['sts']='1';
            }
            array_push($result_data['result'],$rtn_data);
        }
    }
    echo json_encode($result_data);
?>