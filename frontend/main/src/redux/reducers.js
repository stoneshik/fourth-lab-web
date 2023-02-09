import { ADD_RESULT, CLEAR_RESULTS, PASSING_R } from "./action-types";


function reducer(state, action) {
    switch(action.type) {
        case ADD_RESULT: return { results: action.results, r: action.r };
        case CLEAR_RESULTS: return { clear_results: action.clear_results };
        case PASSING_R: return { results: action.results, r: action.r };
        default: return state;
    }
}

export default reducer;