import { ADD_RESULT, CLEAR_RESULTS, PASSING_R } from "./action-types";


export const actionAddResult = (results, r, result) => {
    results.unshift(result);
    return { type: ADD_RESULT, r: [r], results: results };
}
export const actionClearResults = () => {
    return { type: CLEAR_RESULTS, clear_results: true };
}
export const actionPassingR = (r) => {
    return { type: PASSING_R, r: r };
}

