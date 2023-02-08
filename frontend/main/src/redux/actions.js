import {
    ADD_RESULT,
    CLEAR_RESULTS,
    PASSING_R_PARAMETER
} from './action-types.js'

//add cart action
export const addResult = (result) => {
    return {
        type: ADD_RESULT,
        result
    };
}
//remove item action
export const clearResults = () => {
    return {
        type: CLEAR_RESULTS,
        //true
    };
}
