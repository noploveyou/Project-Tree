import { all, takeEvery, select } from "redux-saga/effects";
import fetchDataStepOne from '../api/call-database-step-one';
import fetchDataStepTwo from '../api/call-database-step-two';
import fetchDataStepThree from '../api/call-database-step-three';

const getValueSearchStepTwo = (state) => state.DataMapScreen.ValueSearchPlant;  // รับค่าจาก state
const getKeyValue = (state) => state.DataMapScreen.KeyValue;  // รับค่าจาก state

function* callDataStepOne() {    // เรียกฐานข้อมูลแบบ =
    fetchDataStepOne();
}

function* callDataStepTwo() {    // เรียกฐานข้อมูลแบบ =
    const ValueSearch = yield select(getValueSearchStepTwo);
    fetchDataStepTwo(ValueSearch);
}

function* callDataStepThree() {    // เรียกฐานข้อมูลแบบ =
    const ValueSearch = yield select(getKeyValue);
    fetchDataStepThree(ValueSearch);
}

//ตรวจจับ action types
export function* watchUpdateMAP() {
    yield takeEvery('CALL_DATA_STEP_ONE', callDataStepOne);
    yield takeEvery('CALL_DATA_STEP_TWO', callDataStepTwo);
    yield takeEvery('CALL_DATA_STEP_THREE', callDataStepThree);
}

//รวม Saga ไว้
export default function* MapSaga() {
    yield all([
        watchUpdateMAP()
    ])
}