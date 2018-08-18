import { takeEvery, put, all, select } from "redux-saga/effects";
import fetchDataMAP from '../api/call-dataGetMap';

const getValueSearch = (state) => state.DataHomeScreen.Search;  // รับค่าจาก state


function* callDataGetMAP() {    // เรียกฐานข้อมูลแบบ =
    fetchDataMAP();
}

//ตรวจจับ action types
export function* watchUpdateMAP() {
    yield takeEvery('CALL_DATA_MAIN_MAP', callDataGetMAP);        //จับ Type 'CALL_DATA_IS'
    //yield takeEvery('CALL_DATA_LIKE', callDataLike);    //จับ Type 'CALL_DATA_LIKE'
}

//รวม Saga ไว้
export default function* MapSaga() {
    yield all([
        watchUpdateMAP()
    ])
}