import { takeEvery, all, select } from "redux-saga/effects";
import fetchDataHomePage from '../api/call-database';
import fetchCheckDataHomePage from "../api/check-database";

const getValueSearch = (state) => state.DataHomeScreen.Search;  // รับค่าจาก state

function* callDataLike() {  // เรียกฐานข้อมูลแบบ where like
    const ValueKey = yield select(getValueSearch);
    fetchDataHomePage(ValueKey);
}

function* callDataIs() {    // เรียกฐานข้อมูลแบบ =
    const CheckValueKey = yield select(getValueSearch);
    fetchCheckDataHomePage(CheckValueKey);
}

//ตรวจจับ action types
export function* watchUpdateValueSearch() {
    yield takeEvery('CALL_DATA_HOMEPAGE_IS', callDataIs);        //จับ Type 'CALL_DATA_IS'
    yield takeEvery('CALL_DATA_HOMEPAGE_LIKE', callDataLike);    //จับ Type 'CALL_DATA_LIKE'
}

//รวม Saga ไว้
export default function* SearchSaga() {
    yield all([
        watchUpdateValueSearch()
    ])
}
