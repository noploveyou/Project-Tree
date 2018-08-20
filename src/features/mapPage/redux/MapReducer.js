const MapReducer = (state={DataSearchMap: "", DataListMap: []}, action) => {
    switch (action.type){
        case "GET_POSITION" : {     // ตำแหน่งผู้ใช้ lat, lng, latDel, lngDel
            state = {
                ...state,
                MyLocation: action.payload,
            }
        }
            break;

        case "ADD_DATA_MAIN_MAP" : {    // All Mark Trees in MAP
            state = {
                ...state,
                DataOnMap: action.payload,
            }
        }
            break;
        case "CHECK_DATA_MAIN_MAP" : {      // Check Success = true
            state = {
                ...state,
                CheckDataOnMap: action.payload,
            }
        }
            break;

        case "ADD_DATA_LIST_MAP" : {
            state = {
                ...state,
                DataListMap: action.payload,
            }
        }
            break;

        case "SET_VALUE_SEARCH_LIST_MAP" : {      // Check Success = true
            state = {
                ...state,
                DataSearchMap: action.payload,
            }
        }
            break;

        case "ADD_DATA_SELECTED_MAP" : {
            state = {
                ...state,
                DataSelectedMap: action.payload,
            }
        }
            break;

        case "CHECK_DATA_SELECTED_MAP" : {      // Check Success = true
            state = {
                ...state,
                CheckDataSelectedMap: action.payload,
            }
        }
            break;


        default:
    }
    return state;
};

export default MapReducer;
