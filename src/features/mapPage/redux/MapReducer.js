const MapReducer = (state={ValueSearchPlant: "", DataListStepTwo: []}, action) => {
    switch (action.type){
        case "ADD_MARK_MAP_STEP_ONE" : {    // Mark in MAP StepOne
            state = {
                ...state,
                DataMarkStepOne: action.payload,
            }
        }
            break;
        case "CHECK_MARK_MAP_STEP_ONE" : {
            state = {       // Check Success = true
                ...state,
                CheckDataMarkStepOne: action.payload,
            }
        }
            break;

        case "ADD_DATA_LIST_MAP_STEP_TWO" : {        // List in MAP StepTwo
            state = {
                ...state,
                DataListStepTwo: action.payload,
            }
        }
            break;

        case "SET_VALUE_SEARCH_LIST_MAP" : {    // Value Search in MAP StepTwo
            state = {
                ...state,
                ValueSearchPlant: action.payload,
            }
        }
            break;

        case "ADD_DATA_MARK_STEP_THREE" : {        // Mark in MAP StepTree
            state = {
                ...state,
                DataMarkStepThree: action.payload,
            }
        }
            break;

        case "CHECK_DATA_MARK_STEP_THREE" : {
            state = {    // Check Success = true
                ...state,
                CheckDataMarkStepThree: action.payload,
            }
        }
            break;


        default:
    }
    return state;
};

export default MapReducer;
