import { all } from "redux-saga/effects";
import SearchSaga from '../features/homePage/redux/Saga';

//รวม Saga ไว้
export default function* rootSaga() {
    yield all([
        SearchSaga()
    ])
}
