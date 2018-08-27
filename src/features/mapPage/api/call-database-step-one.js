import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchDataStepOne() {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: "",
                check: "MAPSCREEN_STEP_ONE"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({     // action
                type: 'ADD_MARK_MAP_STEP_ONE',
                payload : responseJson
            });
            store.dispatch({     // action
                type: 'CHECK_MARK_MAP_STEP_ONE',
                payload : true
            })
        })
        .catch(function (error) {
            store.dispatch({     // action
                type: 'CHECK_MARK_MAP_STEP_ONE',
                payload : false
            })
        })
}

module.exports = fetchDataStepOne;
