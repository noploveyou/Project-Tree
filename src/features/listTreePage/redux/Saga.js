import { all, takeEvery, select } from "redux-saga/effects";
import fetchData from '../api/call-data';

const getValueSearch = (state) => state.DataListTreeScreen.ValueSearch;  // รับค่าจาก state

function* callData() {    // เรียกฐานข้อมูลแบบ =
    const ValueSearch = yield select(getValueSearch);
    fetchData(ValueSearch);
}

//ตรวจจับ action types
export function* watchSearchList() {
    yield takeEvery('CALL_DATA_LIST_TREE', callData);
}

//รวม Saga ไว้
export default function* ListSaga() {
    yield all([
        watchSearchList()
    ])
}