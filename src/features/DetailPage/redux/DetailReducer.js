const DetailReducer = (state={DataSource: [], Search: "", CheckData: false}, action) => {
    switch (action.type){
        case "SET_VALUE_DETAIL" : {
            state = {
                ...state,
                Search: action.payload
            }
        }
            break;

        case "ADD_DATA_DETAIL" : {
            state = {
                ...state,
                DataSource: action.payload,
            }
        }
            break;

        case "CHECK_DATA_DETAIL" : {
            state = {
                ...state,
                CheckData: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default DetailReducer;
