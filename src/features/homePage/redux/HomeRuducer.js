const homeReducer = (state={DataSource: [], Search: "", CheckDataSource: false}, action) => {
    switch (action.type){
        case "SET_VALUE_HOME_SEARCH" : {
            state = {
                ...state,
                Search: action.payload
            }
        }
            break;

        case "ADD_DATA_LIST_HOMEPAGE" : {
            state = {
                ...state,
                DataSource: action.payload,
            }
        }
            break;

        case "CHECK_DATA_LIST_HOMEPAGE" : {
            state = {
                ...state,
                CheckDataSource: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default homeReducer;
