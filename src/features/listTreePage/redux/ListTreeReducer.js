const ListTreeReducer = (state={ValueSearch: "", DataListTree: null}, action) => {
    switch (action.type){
        case "ADD_DATA_LIST_TREE" : {        // List Tree data form database
            state = {
                ...state,
                DataListTree: action.payload,
            }
        }
            break;

        case "SET_VALUE_SEARCH_LIST_TREE" : {    // Value Search in ListTreeScreen
            state = {
                ...state,
                ValueSearch: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default ListTreeReducer;
