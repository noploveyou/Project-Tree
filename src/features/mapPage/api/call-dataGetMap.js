import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchDataMAP() {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: "",
                check: "Map"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({     // action
                type: 'ADD_DATA_MAIN_MAP',
                payload : responseJson
            });
            store.dispatch({     // action
                type: 'ADD_DATA_MAIN_MAP.CHECK_SUCCESS',
                payload : true
            })
        })
        .catch(function (error) {
            store.dispatch({     // action
                type: 'ADD_DATA_MAIN_MAP.CHECK_SUCCESS',
                payload : false
            })
        })

}

module.exports = fetchDataMAP;
