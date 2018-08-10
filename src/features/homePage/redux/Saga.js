import { takeEvery, put, all, select } from "redux-saga/effects";
import fetchData from '../api/call-database';
import fetchCheckData from "../api/check-database";

const getValueSearch = (state) => state.DataHomeScreen.Search;  // รับค่าจาก state

function* callDataLike() {  // เรียกฐานข้อมูลแบบ where like
    const ValueKey = yield select(getValueSearch);
    fetchData(ValueKey);
}

function* callDataIs() {    // เรียกฐานข้อมูลแบบ =
    const CheckValueKey = yield select(getValueSearch);
    fetchCheckData(CheckValueKey);
}

//ตรวจจับ action types
export function* watchUpdateValueSearch() {
    yield takeEvery('CALL_DATA_IS', callDataIs);        //จับ Type 'CALL_DATA_IS'
    yield takeEvery('CALL_DATA_LIKE', callDataLike);    //จับ Type 'CALL_DATA_LIKE'
}

//รวม Saga ไว้
export default function* SearchSaga() {
    yield all([
        watchUpdateValueSearch()
    ])
}