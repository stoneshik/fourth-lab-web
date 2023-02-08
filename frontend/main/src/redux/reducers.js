import {
    ADD_RESULT,
    CLEAR_RESULTS,
    PASSING_R_PARAMETER
} from './action-types.js'


function reducer(state, action) {
    switch(action.type) {
        case ADD_RESULT: return { results: action.results };
        case CLEAR_RESULTS: return { clear_results: action.clear_results };
        case PASSING_R_PARAMETER: return { r_parameter: action.r_parameter };
        default: return state;
    }
}

export default reducer;