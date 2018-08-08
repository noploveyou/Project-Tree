import {BASE_URL} from "../../../common/constants";
import store from "../../../common/initialStore";

function fetchData(token,checkType) {
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: token,
                check: checkType
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
            store.dispatch({
                type: 'ADD_DATA_RESULTS',
                payload : responseJson
            })

        })
        .catch(function (error) {
        })

}

module.exports = fetchData;