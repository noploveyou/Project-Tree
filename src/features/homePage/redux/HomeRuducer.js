const homeReducer = (state={Search: ''},action) => {
    switch (action.type){
        case "setTextSearch" : {
            state = {
                ...state,
                Search: action.payload
            }
        }
            break;

        default:
    }
    return state;
};

export default homeReducer;
