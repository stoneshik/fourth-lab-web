import { ADD_RESULT, CLEAR_RESULTS, PASSING_R } from "./action-types";


const reducer = (state, action) => {
    switch(action.type) {
        case ADD_RESULT: return { results: action.results, r: action.r, counter: action.counter };
        case CLEAR_RESULTS: return { results: action.results, r: action.r, counter: action.counter };
        case PASSING_R: return { results: action.results, r: action.r, counter: action.counter };
        default: return state;
    }
}

export default reducer;
