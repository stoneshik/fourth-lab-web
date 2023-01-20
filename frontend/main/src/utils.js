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
    if (String(y).length > 9) {resultY = false;}
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
    if (String(y).match(regex) == null) {resultY = false;}
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
export function outputErrorRange(x, y, r) {
    const errorLabels = [];
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    let resultX = true;
    let resultY = true;
    let resultR = true;
    for (let i=0; i < x.length; i++) {
        const valueX = parseFloat(String(x[i]['code']));
        if (valueX < -5 || valueX > 3) {resultX = false; break;}
    }
    if (String(y).match(regex) == null) {
        const valueY = parseFloat(String(y));
        if (valueY < -5 || valueY > 3) {resultY = false;}
    }
    for (let i=0; i < r.length; i++) {
        const valueR = parseFloat(String(r[i]['code']));
        if (valueR < 1 || valueR > 3) {resultR = false; break;}
    }
    if (!resultX || !resultY || !resultR) {
        if (!resultX) {errorLabels.push("x");}
        if (!resultY) {errorLabels.push("y");}
        if (!resultR) {errorLabels.push("r");}
        return <p className="error">{errorLabels.join(", ")} - выход за за границы</p>;
    }
    return false;
}
export function outputErrorAmountSelect(x, r) {
    if (x.length !== r.length) {
        return <p className="error">x и r - должны иметь одинаковое количество выбранных элементов</p>;
    }
    return false;
}
