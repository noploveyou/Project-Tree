<?php
include 'connect.php';

// Create connection
$conn = mysqli_connect($HostName, $HostUser, $HostPass, $DatabaseName);
mysqli_query($conn,"SET CHARACTER SET UTF8");
if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);
}

$GetPlantName = file_get_contents('php://input');
$TextPlantName = json_decode($GetPlantName,true);

$plantName = $TextPlantName['plantName'];
$Check = $TextPlantName['check'];

if($Check=="Like_HOMEPAGESCREEN"){
    $sql = "SELECT * FROM plant WHERE (plantName LIKE '%" . $plantName . "%')";
    $result = $conn->query($sql);

    if ($result->num_rows >0) {
        while($row[] = $result->fetch_assoc()) {
            $tem = $row;
            $json = json_encode( $tem, JSON_UNESCAPED_UNICODE );
        }
    } else {
        echo "No Results Found.";
        $json = "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="IS_HOMEPAGESCREEN"){
    $sql = "SELECT * FROM plant WHERE (plantName = '$plantName' )";
//$sql = "SELECT * FROM plant WHERE (plantName='$plantName' )";  ต้องพิมพ์ครบ ถึงเจอ 'พรรณไม้ที่มีมากกว่า1ชื่อ กรุณากดเลือกในรายชื่อด้านล่าง'
    $result = $conn->query($sql);

    if ($result->num_rows >0) {
        while($row[] = $result->fetch_assoc()) {
            $tem = $row;
            $json = json_encode( $tem, JSON_UNESCAPED_UNICODE );
        }
    } else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="MAPSCREEN_STEP_ONE"){
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
            FROM area,plant,location 
            WHERE lx != 0.0 AND ly != 0.0 AND plant.plantID = area.plantID AND location.locationID = area.locationID";
    $result = $conn -> query($sql);

    if ($result -> num_rows > 0) {
        while($row[] = $result->fetch_assoc()) {
            $tem = $row;
            $json = json_encode( $tem, JSON_UNESCAPED_UNICODE );
        }
    } else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();
}else if($Check=="MAPSCREEN_STEP_TWO"){
    $sql = "SELECT * FROM plant WHERE (plantName LIKE '%" . $plantName . "%' 
            OR plantScience LIKE'%" . $plantName . "%')";
    $result = $conn->query($sql);

    if ($result->num_rows >0) {
        while($row[] = $result->fetch_assoc()) {
            $tem = $row;
            $json = json_encode( $tem, JSON_UNESCAPED_UNICODE );
        }
    } else {
        echo "No Results Found.";
        $json = "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="MAPSCREEN_STEP_THREE") {
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
            FROM area,plant,location 
            WHERE plant.plantName = '$plantName' AND  area.plantID = plant.plantID AND location.locationID = area.locationID  ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row[] = $result->fetch_assoc()) {
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();
}

/*$txtKeyword = "กระ";
if($txtKeyword!= "") {
    // Search By Name or Email
    $sql = "SELECT * FROM plant WHERE (plantName LIKE '%" . $txtKeyword . "%' or plantScience LIKE '%" . $txtKeyword . "%' )";
    $result = $conn->query($sql);

    while ($objResult = mysqli_fetch_array($result)) {
        echo $objResult["plantName"];
    }

    $conn->close();
}*/
?>