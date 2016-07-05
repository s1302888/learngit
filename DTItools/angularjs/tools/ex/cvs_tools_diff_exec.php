<?php
    $branch_name=escapeshellarg ($_POST['branch_name']);
    $file_name=escapeshellarg ($_POST['file_name']);
    $rev1=escapeshellarg ($_POST['rev1']);
    $rev2=escapeshellarg ($_POST['rev2']);
   $cmd="ssh root@172.16.66.160 /var/tools/cvsToolsDiff4web.sh $branch_name $file_name $rev1 $rev2 2>&1";
   $cmd=escapeshellcmd($cmd);
    exec ( $cmd , $result ,$ret );
    if (!$ret){
      foreach ($result as $value)
      {
        if ($value == "Password:"){
          continue;
        }
        if (preg_match('/^err/',$value)){

            $result_data_ng = array();
            $result_data_ng['sts']='1';
            $result_data_ng['msg']=$value;
            echo json_encode($result_data_ng);
            break;
        }
        $info = explode("\\", $value);
        $result_data = array();
        $result_data['sts']='0';
        $result_data['file1']=$info[0];
        $result_data['file2']=$info[1];
        $result_data['url']="start4web2:$value";
        echo json_encode($result_data);
      }
    }else{
        $result_data_ng = array();
        $result_data_ng['msg']=$result[0];
        $result_data_ng['sts']='1';
        echo json_encode($result_data_ng);
    }
?>