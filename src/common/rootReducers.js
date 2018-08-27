import homeReducer from '../features/homePage/redux/HomeRuducer';
import MapReducer from '../features/mapPage/redux/MapReducer';

const CheckDevice = (state={}, action) => {
    switch (action.type){
        case "GET_USER_LOCATION" : {     // ตำแหน่งผู้ใช้ lat, lng, latDel, lngDel  in MAP StepOne, StepTree
            state = {
                ...state,
                UserLocation: action.payload,
            }
        }
            break;

        case "USE_INTERNET" : {
            state = {
                ...state,
                InternetIsConnect: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

const rootReducer = {
    CheckDevice: CheckDevice,
    DataHomeScreen: homeReducer,
    DataMapScreen: MapReducer,
};

export default rootReducer;
