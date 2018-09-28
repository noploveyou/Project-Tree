import { takeEvery, all, select } from "redux-saga/effects";
import fetchData from "../api/call-data";
import fetchDataLocation from "../api/call-data-Location";

const getValueSearch = (state) => state.DataDetailScreen.Search;  // รับค่าจาก state

function* callData() {    // เรียกฐานข้อมูลแบบ =
    const CheckValueKey = yield select(getValueSearch);
    fetchData(CheckValueKey);
}

function* callDataLocation() {    // เรียกฐานข้อมูลแบบ =
    const CheckValueKey = yield select(getValueSearch);
    fetchDataLocation(CheckValueKey);
}

//ตรวจจับ action types
export function* watchDetail() {
    yield takeEvery('CALL_DATA_DETAIL', callData);        //จับ Type 'CALL_DATA_IS'
    yield takeEvery('CALL_DATA_DETAIL', callDataLocation);
}

//รวม Saga ไว้
export default function* DetailSaga() {
    yield all([
        watchDetail()
    ])
}
