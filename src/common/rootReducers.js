import homeReducer from '../features/homePage/redux/HomeRuducer';

const DatabaseReducer = (state={DataSource: []},action) => {
    switch (action.type){
        case "AddDataSource" : {
            state = {
                ...state,
                DataSource: action.payload,

            }
        }
            break;

        default:
    }
    return state;
};

const rootReducer = {
    Search: homeReducer,
    DataSource: DatabaseReducer
};

export default rootReducer;