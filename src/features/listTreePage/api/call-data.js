import { BASE_URL } from "../../../common/constants";   // url Database
import store from "../../../common/initialStore";

function fetchData(value) {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: value,
                check: "LIKE_LIST_TREE_SCREEN"           // ค่าที่ส่งไป php (เช็ค เป็น Like, where)
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({     // action
                type: 'ADD_DATA_LIST_TREE',
                payload : responseJson
            });
        })
        .catch(function (error) {
            console.log("error")
        })
}

module.exports = fetchData;
