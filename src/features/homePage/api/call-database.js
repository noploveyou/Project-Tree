import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchDataHomePage(ValueKey) {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: ValueKey,    // ค่าที่ส่งไป php
                check: "Like_HOMEPAGESCREEN"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({     // action
                type: 'ADD_DATA_LIST_HOMEPAGE',
                payload : responseJson
            })
        })
        .catch(function (error) {
        })
}

module.exports = fetchDataHomePage;
