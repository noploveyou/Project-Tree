import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducers";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// แสดง ประเภท Actions ที่เกิดขึ้น
const showLog = (store) => (next) => (action) => {
    console.log("Log Action", action);
    next(action);
};

// สร้าง store
const store = createStore(combineReducers
    ({
        ...rootReducer
    }),{}, compose(applyMiddleware(sagaMiddleware, showLog))
);

// แสดงข้อมูล หาก store มีการเปลี่ยนแปลง
store.subscribe(() => {
        console.log("Update Store : ", store.getState());
    }
);

// run the saga
sagaMiddleware.run(rootSaga);

export default store;
