export function outputErrorRequired(xType, yType, rType) {
    const errorLabels = [];
    if (xType === "required" || yType === "required" || rType === "required") {
        if (xType === "required") {errorLabels.push("x");}
        if (yType === "required") {errorLabels.push("y");}
        if (rType === "required") {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - необходимо заполнить</p>;
    }
    return false;
}
export function outputErrorMaxLength(xType, yType, rType) {
    const errorLabels = [];
    if (xType === "maxLength" || yType === "maxLength" || rType === "maxLength") {
        if (xType === "maxLength") {errorLabels.push("x");}
        if (yType === "maxLength") {errorLabels.push("y");}
        if (rType === "maxLength") {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - превышена длина ввода</p>;
    }
    return false;
}
export function outputErrorPattern(xType, yType, rType) {
    const errorLabels = [];
    if (xType === "pattern" || yType === "pattern" || rType === "pattern") {
        if (xType === "pattern") {errorLabels.push("x");}
        if (yType === "pattern") {errorLabels.push("y");}
        if (rType === "pattern") {errorLabels.push("r");}
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
