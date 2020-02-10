<?php
$name="";
$score="";

if(isset($_POST['Name']))
{$name=$_POST['Name'];}
if(isset($_POST['Score'])){$score=$_POST['Score'];}



$serverName = "comp4711.database.windows.net";
    $connectionOptions = array(
        "Database" => "SIGNIN",
        "Uid" => "Jerry",
        "PWD" => "Comp4711"
    );
    //Establishes the connection
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if($conn){
        $tsql= "INSERT INTO board VALUES('$name','$score');";
        $getResults= sqlsrv_query($conn, $tsql);
    }
    else{
        
    }
exit();

?>