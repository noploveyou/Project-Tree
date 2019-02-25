<?php
include "../Connections/connectForMobile.php";

$GetPlantName = file_get_contents('php://input');
$TextPlantName = json_decode($GetPlantName, true);
$plantName = $TextPlantName['plantName'];
$Check = $TextPlantName['check'];

if($Check == "Like_HOMEPAGESCREEN"){    /* SearchInput In Page HomeScreen */
    $sql = "SELECT * FROM plant WHERE plantName LIKE '%".$plantName."%' OR plant.plantScience LIKE '%".$plantName."%' ";
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

}else if($Check == "IS_HOMEPAGESCREEN"){  /* CheckValueDatabase In Page HomeScreen */
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

}else if($Check == "LIKE_LIST_TREE_SCREEN"){     /* Page ListTreesScreen */
    $sql = "SELECT plant.*, images.* FROM plant, images 
            WHERE (plant.plantName LIKE '%".$plantName."%' OR plant.plantScience LIKE '%".$plantName."%')
            AND images.plantID = plant.plantID";
    $result = $conn->query($sql);

    if($result->num_rows >0){
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode( $tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check == "IS_DETAILSCREEN"){       /* Page DetailScreen */
    $sql = "SELECT plant.*, plantfamily.plantFamilyName, extraction.extractionName, images.*
                FROM plant, plantfamily, extraction, propagation, images
                WHERE (plant.plantName = '$plantName') AND propagation.plantID = plant.plantID 
                AND extraction.extractionID = propagation.popID  AND plantfamily.familyID = plant.plantFamilyID 
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

}else if($Check == "IS_DETAILSCREEN_LOCATION"){      /* Page DetailScreen in Tap Location */
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
            FROM area, plant, location 
            WHERE plant.plantName = '$plantName' AND  area.plantID = plant.plantID 
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

}else if($Check == "MAPSCREEN_STEP_ONE"){      /* Page MapsScreen */
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
            FROM area, plant, location WHERE lx != 0.0 AND ly != 0.0 AND plant.plantID = area.plantID 
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

}else if($Check == "MAPSCREEN_STEP_TWO"){        /* Page ListMapScreen When Use Search Function */
    $sql = "SELECT plant.plantID, plant.plantName, plant.plantScience ,plant.plantIcon
                FROM plant WHERE (plant.plantName LIKE '%".$plantName."%' 
                OR plant.plantScience LIKE '%".$plantName."%') ";
    $result = $conn->query($sql);

    if ($result->num_rows >0) {
        while($row[] = $result->fetch_assoc()){
            $tem = $row;
            $json = json_encode($tem, JSON_UNESCAPED_UNICODE);
        }
    }else {
        echo "No Results Found.";
    }
    echo $json;
    $conn->close();

}else if($Check == "MAPSCREEN_STEP_THREE"){      /* Page SelectedMapScreen When Selected */
    $sql = "SELECT plant.plantID, plant.plantIcon , plant.plantName ,location.locationName, area.lx, area.ly
            FROM area, plant, location 
            WHERE plant.plantName = '$plantName' AND  area.plantID = plant.plantID 
            AND location.locationID = area.locationID AND area.lx != 0.0 AND area.ly != 0.0 ";
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
