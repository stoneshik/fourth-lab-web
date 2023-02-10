import { ADD_RESULT, CLEAR_RESULTS, PASSING_R } from "./action-types";


export const actionAddResult = (props, result) => {
    props.results.unshift(...result);
    return { type: ADD_RESULT, results: props.results, r: props.r, counter: iterateCounter(props.counter) };
}
export const actionClearResults = (props) => {
    return { type: CLEAR_RESULTS, results: [], r: props.r, counter: iterateCounter(props.counter) };
}
export const actionPassingR = (props, r) => {
    return { type: PASSING_R, results: props.results, r: r, counter: iterateCounter(props.counter) };
}

const iterateCounter = (counter) => {
    const maxCounterValue = 1024;
    return (counter > maxCounterValue) ? 0 : counter + 1;
}
