<?php
    $serverName = "comp4711.database.windows.net";
    $connectionOptions = array(
        "Database" => "SIGNIN",
        "Uid" => "Jerry",
        "PWD" => "Comp4711"
    );
    //Establishes the connection
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if($conn){
    $tsql= "SELECT Name, Score FROM board Order by Score desc;";
    $getResults= sqlsrv_query($conn, $tsql);
    echo ".<br>";
    include 'highscore.html';
    $count = 1;
    if ($getResults == FALSE)
        die(FormatErrors(sqlsrv_errors()));
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
        if($count < 11){
        echo "<tr>";
        echo ("<td class='c1'>".$count."</td>" . "<td class='c2'>" . $row['Name'] . "</td class='c3'> " . "<td>".$row['Score'] ."</td>". PHP_EOL);
         echo "</tr>";
        }
        $count++;
}
    }
include 'highscore_end.html';
sqlsrv_free_stmt($getResults);

?>


		