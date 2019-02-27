const DetailReducer = (state={DataSource: [], Search: "", CheckData: false,
    DataLocationSource: [], CheckLocationData: false, ScienceMultiLine: false}, action) => {

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

        case "ADD_LOCATION_DATA_DETAIL" : {
            state = {
                ...state,
                DataLocationSource: action.payload,
            }
        }
            break;

        case "CHECK_LOCATION_DATA_DETAIL" : {
            state = {
                ...state,
                CheckLocationData: action.payload,
            }
        }
            break;

        case "CHECK_SCIENCE_NAME_DATA_DETAIL" : {
            state = {
                ...state,
                ScienceMultiLine: action.payload,
            }
        }
            break;

        default:
    }
    return state;
};

export default DetailReducer;
