import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Result } from "./Results";
import { actionAddResult } from "../redux/actions";
import { Canvas } from "../utils/Canvas";


class CanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: '' };
        this.canvas = new Canvas();
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.canvas.updateCanvasObj();
        this.canvas.drawCanvas();
    }
    handleClick(event) {
        const rValues = this.props.r;
        if (rValues === undefined || rValues == null) {
            return;
        }
        const errorMessage = this.validateR(rValues);
        if (errorMessage !== false) {
            this.setState({errorMessage: errorMessage});
            return;
        }
        this.setState({errorMessage: ''});
        let r = parseFloat(String(rValues[0]).trim());
        this.setState({valueR: r});
        const offsetX = event.clientX - event.target.offsetLeft;
        const offsetY = event.clientY - event.target.offsetTop;
        const xy = this.canvas.calcCoordinates(offsetX, offsetY, r);
        this.addDot(xy['x'], xy['y'], r);
    }
    validateR(rValues) {
        const errorRequired = outputErrorRequired(rValues);
        if (errorRequired !== false) {
            return errorRequired;
        }
        const errorSelected = outputErrorSelected(rValues);
        if (errorSelected !== false) {
            return errorSelected;
        }
        const r = rValues[0];
        return (
            outputErrorMaxLength(r) ||
            outputErrorPattern(r) ||
            outputErrorRange(r)
        );
    }
    addDot(x, y, r) {
        this.props.addResult(
            this.props.results,
            [r],
            new Result(true, x, y, r, '12:40:50', 1111)
        );
    }
    updateCanvas(results) {
        if (results === undefined || results.length === undefined || results.length === 0) {
            return;
        }
        const dotsManager = this.canvas.dotsManager;
        dotsManager.cleanDots();
        dotsManager.r = results[0].r;
        for (let i=0; i < results.length; i++) {
            const result = results[i];
            if (result.r !== dotsManager.r) {
                break;
            }
            dotsManager.addDot(
                dotsManager.newDot(result.isHit, result.x, result.y, result.r)
            );
        }
        this.canvas.drawCanvas();
        return <div></div>;
    }
    render() {
        return (
            <div>
                <canvas id="canvas" height="600" width="600" onClick={(e) => this.handleClick(e)}></canvas>
                {this.state.errorMessage}
                {this.updateCanvas(this.props.results)}
            </div>
        );
    }
}

function outputErrorRequired(rValues) {
    if (rValues == null ||rValues.length === undefined || rValues.length === 0) {
        return <p className="error">Не выбрано r</p>;
    }
    return false;
}
function outputErrorSelected(rValues) {
    if (rValues.length > 1) {
        return <p className="error">Выбрано более одного значения r</p>;
    }
    return false;
}
function outputErrorMaxLength(rValues) {
    if (String(rValues).length > 9) {
        return <p className="error">Превышена длина ввода r</p>;
    }
    return false;
}
function outputErrorPattern(rValues) {
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    if (String(rValues).match(regex) == null) {
        return <p className="error">Неправильный формат ввода r</p>;
    }
    return false;
}
function outputErrorRange(rValues) {
    const valueR = parseFloat(String(rValues));
    if (valueR < 1 || valueR > 3) {
        return <p className="error">r выходит за допустимый диапазон</p>;
    }
    return false;
}

const mapStateToProps = (state) => {
    return { results: state.results, r: state.r };
}
const mapDispatchToProps = (dispatch) => {
    return { addResult: bindActionCreators(actionAddResult, dispatch) };
}

export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);