import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchDataStepTwo(value) {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: value,
                check: "MAPSCREEN_STEP_TWO"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
    .then((response) => response.json())
    .then((responseJson) => {
        store.dispatch({     // action
            type: 'ADD_DATA_LIST_MAP_STEP_TWO',
            payload : responseJson
        });
    })
    .catch(function (error) {
    })
}

module.exports = fetchDataStepTwo;
