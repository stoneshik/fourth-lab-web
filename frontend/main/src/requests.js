import $ from "jquery";
import { Result } from "./utils/Result";

export const loadDots = (addResult, props) => {
    $.get({
        url: "../api/dot/load",
    }).done(function(data) {
        addResultsInTable(data, addResult, props);
    });
}

export const addNewDotsRequest = (dotsCords, addResult, props) => {
    $.post({
        url: "../api/dot/add",
        data: { "dots": String(JSON.stringify(dotsCords)) }
    }).done(function(data) {
        addResultsInTable(data, addResult, props);
    });
}

export const clearDotsRequest = (clearResults, props) => {
    $.ajax({
        method: "DELETE",
        url: "../api/dot/clear"
    }).done(function(data) {
        clearResults(props);
    });
}

export const logoutRequest = () => {
    $.post({
        url: "../api/user/logout",
        data: {}
    }).done(function(data) {
        window.location.replace("../");
    });
}


function addResultsInTable(data, addResult, props) {
    const dots = data.dots;
    if (dots === undefined || dots == null || dots.length === undefined) {
        return;
    }
    const resultDots = [];
    let dot, isHit, x, y, r, timeDispatch, timeLead;
    for (let i=0; i < dots.length; i++) {
        dot = dots[i];
        isHit = dot['isHit'];
        x = dot['x'];
        y = dot['y'];
        r = dot['r'];
        timeDispatch = dot['timeDispatch'];
        timeLead = dot['timeLead'];
        if (isHit === undefined || x === undefined || y === undefined || r === undefined
            || timeDispatch === undefined || timeLead === undefined ||
            isHit == null || x == null || y == null || r == null || timeDispatch == null || timeLead == null) {
            break;
        }
        resultDots.push(new Result(isHit, x, y, r, timeDispatch, timeLead));
    }
    addResult(props, resultDots);
}