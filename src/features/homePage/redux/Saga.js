import { takeEvery, put, all, select } from "redux-saga/effects";
import {BASE_URL} from "../../../common/constants";
import store from "../../../common/initialStore";
import fetchData from '../api/call-database';

const getValueSearch = (state) => state.DataHomeScreen.Search;
const getValueSearch2 = (state) => state.DataHomeScreen.Search;

function* callDataLike() {
    const token = yield select(getValueSearch);
    fetchData(token,"Like")
}

function* callDataIs() {
    const token2 = yield select(getValueSearch2);
    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plantName: token2,
                check: "Is"
            })
        }
    )
        .then((response) => response.json())
        .then((responseJson) => {
             if(responseJson.length > 0){
                 store.dispatch({
                     type: 'CHECK_DATA',
                     payload : true
                 });
             }else {
                 store.dispatch({
                     type: 'CHECK_DATA',
                     payload : false
                 });
             }

        })
        .catch(function (error) {
        })
}

//ตรวจจับ
export function* watchUpdateValueSearch() {
    yield takeEvery('CALL_DATA_IS', callDataIs);
    yield takeEvery('CALL_DATA_LIKE', callDataLike);
}

//รวม Saga ไว้
export default function* SearchSaga() {
    yield all([
        watchUpdateValueSearch()
    ])
}