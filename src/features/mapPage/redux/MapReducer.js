const MapReducer = (state={},action) => {
    switch (action.type){
        case "GET_POSITION" : {
            state = {
                ...state,
                MyLocation: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default MapReducer;
