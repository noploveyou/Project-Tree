import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchCheckData(CheckValueKey) {
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            plantName: CheckValueKey,   // ค่าที่ส่งไป php
            check: "Is"                 // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
        })
    }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            // เช็คค่า ถ้ามีจะเป็น 1
            if (responseJson.length > 0) {
                store.dispatch({    // action
                    type: 'CHECK_DATA',
                    payload: true
                });
            } else {
                store.dispatch({    // action
                    type: 'CHECK_DATA',
                    payload: false
                });
            }

        })
        .catch(function (error) {
        })
}

module.exports = fetchCheckData;
