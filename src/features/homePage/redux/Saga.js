import { takeEvery, put, all } from "redux-saga/effects";

function* setAge() {
    try {
        // dispatch a success action to the store with the new dog
        yield put({ type: "setTextSearch", payload: "" });
        alert('Searched')

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "setTextSearch", error });
    }
}

function* updateTextSearch() {
        setAge()
}

//ตรวจจับ
export function* watchUpdateTextSearch() {
    /*yield takeEvery('setTextSearch', updateTextSearch);*/
}

//รวม Saga ไว้
export default function* SearchSaga() {
    yield all([
        watchUpdateTextSearch()
    ])
}