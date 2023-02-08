import {
    ADD_RESULT,
    CLEAR_RESULTS,
    PASSING_R_PARAMETER
} from './action-types.js'

//add cart action
export const addResult = (results, result) => {
    results.push(result);
    return {
        type: ADD_RESULT,
        results: results
    };
}
//remove item action
export const clearResults = () => {
    return {
        type: CLEAR_RESULTS,
        clear_results: true
    };
}

export const passingRParameter = (r) => {
    return {
        type: PASSING_R_PARAMETER,
        r_parameter: r
    };
}

