<?php

//Define your host here.
$HostName = "localhost";

//Define your database name here.
$DatabaseName = "tree";

//Define your database username here.
$HostUser = "root";

//Define your database password here.
$HostPass = "";

$conn = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
mysqli_query($conn,"SET CHARACTER SET UTF8");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>