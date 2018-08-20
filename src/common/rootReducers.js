import homeReducer from '../features/homePage/redux/HomeRuducer';
import MapReducer from '../features/mapPage/redux/MapReducer';

const CheckNET = (state={},action) => {
    switch (action.type){
        case "CHECK_INTERNET" : {
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
    CheckNET: CheckNET,
    DataHomeScreen: homeReducer,
    DataMapScreen: MapReducer,
};

export default rootReducer;