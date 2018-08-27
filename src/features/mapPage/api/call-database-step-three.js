import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchDataStepThree(value) {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: value,
                check: "MAPSCREEN_STEP_THREE"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({     // action
                type: 'ADD_DATA_MARK_STEP_THREE',
                payload : responseJson
            });
            console.log(responseJson);
            store.dispatch({     // action
                type: 'CHECK_DATA_MARK_STEP_THREE',
                payload : true
            })
        })
        .catch(function (error) {
            store.dispatch({     // action
                type: 'CHECK_DATA_MARK_STEP_THREE',
                payload : false
            });
            console.log(responseJson);
        })
}

module.exports = fetchDataStepThree;
