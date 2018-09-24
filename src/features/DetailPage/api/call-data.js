import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchData(ValueKey) {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: ValueKey,    // ค่าที่ส่งไป php
                check: "IS_DETAILSCREEN"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({     // action
                type: 'ADD_DATA_DETAIL',
                payload : responseJson
            });
            store.dispatch({     // action
                type: 'CHECK_DATA_DETAIL',
                payload : true
            });
        })
        .catch(function (error) {
            store.dispatch({     // action
                type: 'CHECK_DATA_DETAIL',
                payload : false
            });
        })
}

module.exports = fetchData;
