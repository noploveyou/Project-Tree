import homeReducer from '../features/homePage/redux/HomeRuducer';
import MapReducer from '../features/mapPage/redux/MapReducer';

const rootReducer = {
    DataHomeScreen: homeReducer,
    DataMapScreen: MapReducer
};

export default rootReducer;