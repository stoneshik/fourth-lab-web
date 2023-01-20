export function outputErrorRequired(x, y, r) {
    const errorLabels = [];
    if (x === null || y == null || r == null ||
        x.length === 0 || r.length === 0) {
        if (x == null || x.length === 0) {errorLabels.push("x");}
        if (y == null) {errorLabels.push("y");}
        if (r == null || r.length === 0) {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - необходимо заполнить</p>;
    }
    return false;
}
export function outputErrorMaxLength(x, y, r) {
    const errorLabels = [];
    let resultX = true;
    let resultY = true;
    let resultR = true;
    for (let i=0; i < x.length; i++) {
        if (String(x[i]['code']).length > 9) {resultX = false; break;}
    }
    for (let i=0; i < y.length; i++) {
        if (String(y[i]['code']).length > 9) {resultY = false; break;}
    }
    for (let i=0; i < r.length; i++) {
        if (String(r[i]['code']).length > 9) {resultR = false; break;}
    }
    if (!resultX || !resultY || !resultR) {
        if (!resultX) {errorLabels.push("x");}
        if (!resultY) {errorLabels.push("y");}
        if (!resultR) {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - превышена длина ввода</p>;
    }
    return false;
}
export function outputErrorPattern(x, y, r) {
    const errorLabels = [];
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    let resultX = true;
    let resultY = true;
    let resultR = true;
    for (let i=0; i < x.length; i++) {
        if (String(x[i]['code']).match(regex) == null) {resultX = false; break;}
    }
    for (let i=0; i < y.length; i++) {
        if (String(y[i]['code']).match(regex) == null) {resultY = false; break;}
    }
    for (let i=0; i < r.length; i++) {
        if (String(r[i]['code']).match(regex) == null) {resultR = false; break;}
    }
    if (!resultX || !resultY || !resultR) {
        if (!resultX) {errorLabels.push("x");}
        if (!resultY) {errorLabels.push("y");}
        if (!resultR) {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - неправильный формат ввода</p>;
    }
    return false;
}
export function outputErrorRange(xType, yType, rType) {
    const errorLabels = [];
    if (xType === "min" || yType === "min" || rType === "min" ||
        xType === "max" || yType === "max" || rType === "max") {
        if (xType === "min" || xType === "max") {errorLabels.push("x");}
        if (yType === "min" || yType === "max") {errorLabels.push("y");}
        if (rType === "min" || rType === "max") {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - выход за за границы</p>;
    }
}
