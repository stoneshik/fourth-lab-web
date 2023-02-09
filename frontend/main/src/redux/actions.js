import { ADD_RESULT, CLEAR_RESULTS, PASSING_R } from "./action-types";


export const actionAddResult = (results, r, result) => {
    results.unshift(result);
    return { type: ADD_RESULT, results: results, r: r };
}
export const actionClearResults = (results, r) => {
    results = [];
    return { type: CLEAR_RESULTS, results: results, r: r };
}
export const actionPassingR = (results, r) => {
    return { type: PASSING_R, results: results, r: r };
}

