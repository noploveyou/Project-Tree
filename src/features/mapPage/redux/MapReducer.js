const MapReducer = (state={},action) => {
    switch (action.type){
        case "GET_POSITION" : {
            state = {
                ...state,
                MyLocation: action.payload,
            }
        }
            break;

        case "ADD_DATA_MAIN_MAP" : {
            state = {
                ...state,
                DataOnMap: action.payload,
            }
        }
            break;
        case "ADD_DATA_MAIN_MAP.CHECK_SUCCESS" : {
            state = {
                ...state,
                CheckDataOnMap: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default MapReducer;
