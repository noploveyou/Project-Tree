<?php
include "connect.php";

$GetPlantName = file_get_contents('php://input');
$TextPlantName = json_decode($GetPlantName,true);
$plantName = $TextPlantName['plantName'];
$Check = $TextPlantName['check'];

if($Check == "Like_HOMEPAGESCREEN"){
    $sql = "SELECT * FROM plant WHERE plantName LIKE '%".$plantName."%' ";
    $result = $conn->query($sql);

    if($result->num_rows >0){
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
        $json = "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="IS_HOMEPAGESCREEN"){
    $sql = "SELECT * FROM plant WHERE (plantName = '$plantName')";
    $result = $conn->query($sql);

    if($result->num_rows >0){
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="LIKE_LIST_TREE_SCREEN"){
    $sql = "SELECT * FROM plant WHERE (plantName LIKE '%".$plantName."%' OR plantScience LIKE '%".$plantName."%')";
    $result = $conn->query($sql);

    if($result->num_rows >0){
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode( $tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
        $json = "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check == "IS_DETAILSCREEN"){
    $sql = "SELECT 
                  plant.*,
                  plantfamily.plantFamilyName,
                  extraction.extractionName,
                  images.*
                FROM plant, plantfamily, extraction, propagation, images
                WHERE (plant.plantName = '$plantName') AND plant.plantID = propagation.plantID 
                AND propagation.popID = extraction.extractionID AND plantfamily.familyID = plant.plantFamilyID 
                AND images.plantID = plant.plantID";
    $result = $conn->query($sql);

    if($result->num_rows >0){
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check == "IS_DETAILSCREEN_LOCATION"){
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
                FROM area,plant,location WHERE plant.plantName = '$plantName' AND  area.plantID = plant.plantID 
                AND location.locationID = area.locationID AND area.lx != 0.0 AND area.ly != 0.0";
    $result = $conn->query($sql);

    if ($result->num_rows > 0){
        while ($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="MAPSCREEN_STEP_ONE"){
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
                FROM area,plant,location WHERE lx != 0.0 AND ly != 0.0 AND plant.plantID = area.plantID 
                AND location.locationID = area.locationID";
    $result = $conn -> query($sql);

    if ($result -> num_rows > 0) {
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check == "MAPSCREEN_STEP_TWO"){
    $sql = "SELECT plant.plantID, plant.plantName, plant.plantScience ,plant.plantIcon, area.areaID
                FROM plant, area  WHERE (plant.plantName LIKE '%".$plantName."%' 
                OR plant.plantScience LIKE '%".$plantName."%') AND area.plantID = plant.plantID 
                AND lx != 0.0 AND ly != 0.0 ";
    $result = $conn->query($sql);

    if ($result->num_rows >0) {
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
        $json = "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check=="MAPSCREEN_STEP_THREE"){
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
                FROM area,plant,location WHERE plant.plantName = '$plantName' AND  area.plantID = plant.plantID 
                AND location.locationID = area.locationID  ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0){
        while ($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();
}
?>

