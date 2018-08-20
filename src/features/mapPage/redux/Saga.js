import { all, takeEvery, select } from "redux-saga/effects";
import fetchDataMAP from '../api/call-dataGetMap';
import fetchDataListMAP from '../api/call-dataGetListMAP';

const getValueSearchListMap = (state) => state.DataMapScreen.DataSearchMap;  // รับค่าจาก state

function* callDataGetMAP() {    // เรียกฐานข้อมูลแบบ =
    fetchDataMAP();
}

function* callDataGetListMAP() {    // เรียกฐานข้อมูลแบบ =
    const ValueSearch = yield select(getValueSearchListMap);
    fetchDataListMAP(ValueSearch);
}

//ตรวจจับ action types
export function* watchUpdateMAP() {
    yield takeEvery('CALL_DATA_MAIN_MAP', callDataGetMAP);
    yield takeEvery('CALL_DATA_LIST_MAP', callDataGetListMAP);
}

//รวม Saga ไว้
export default function* MapSaga() {
    yield all([
        watchUpdateMAP()
    ])
}