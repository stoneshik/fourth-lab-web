import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Result } from "./Results";
import { actionAddResult } from "../redux/actions";
import { Canvas } from "../utils/Canvas";


class CanvasComponent extends Component {
    constructor(props) {
        super(props);
        //this.tableResults = null;
        this.state = {
            valueR: 1
        };
        this.canvas = new Canvas();
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        //this.tableResults = Main.getInstance().tableResults;
        this.canvas.updateCanvasObj();
        this.canvas.drawCanvas();
    }
    addDot(x, y, r) {
        const dotsManager = this.canvas.dotsManager;
        if (dotsManager.r !== r) {
            dotsManager.cleanDots();
        }
        dotsManager.r = r;
        dotsManager.addDot(
            dotsManager.newDot(true, x, y, r)
        );
        this.props.addResult(
            this.props.results,
            r,
            new Result(true, x, y, r, '12:40:50', 1111)
        );
    }
    handleClick(event) {
        //const elementR = document.querySelector('#r .p-multiselect-label');
        const elementR = this.props.r[0];
        if (elementR === undefined || elementR == null) {
            return;
        }
        //let r = elementR.innerText.trim().split(',')[0];
        let r = String(elementR).trim().split(',')[0];
        this.setState({valueR: r});
        if (!this.validateR(r)) {
            return;
        }
        r = parseFloat(r);
        const offsetX = event.clientX - event.target.offsetLeft;
        const offsetY = event.clientY - event.target.offsetTop;
        const xy = this.canvas.calcCoordinates(offsetX, offsetY, r);
        /*const dotsManager = this.canvas.dotsManager;
        if (dotsManager.r !== r) {
            dotsManager.cleanDots();
        }
        dotsManager.r = r;
        dotsManager.addDot(
            dotsManager.newDot(true, xy['x'], xy['y'], r)
        );
        //this.canvas.drawCanvas();
        //console.log(this.props.r_parameter);
        this.props.addResult(
            new Result(true, xy['x'], xy['y'], r, '12:40:50', 1111),
            this.props.results
        );*/
        this.addDot(xy['x'], xy['y'], r);
        console.log(this.props);
        //Main.getInstance().tableResults.resultsManager.addResults(new Result(true, xy['x'], xy['y'], r, '12:40:50', 1111));
        //Main.getInstance().tableResults.updateResults();
        //console.log(this.tableResults);
        console.log(r);
        console.log(xy)
        console.log(event);
        this.canvas.drawCanvas();
    }
    validateR(r) {
        return !(
            outputErrorRequired(r) !== false ||
            outputErrorMaxLength(r) !== false ||
            outputErrorPattern(r) !== false ||
            outputErrorRange(r) !== false
        );
    }
    render() {
        return (
            <div>
                <canvas id="canvas" height="600" width="600" onClick={(e) => this.handleClick(e)}></canvas>
                {outputErrorRequired(this.state.valueR)}
                {outputErrorMaxLength(this.state.valueR)}
                {outputErrorPattern(this.state.valueR)}
                {outputErrorRange(this.state.valueR)}
            </div>
        );
    }
}

function outputErrorRequired(r) {
    if (r == null || r.length === 0) {
        return <p className="error">не выбрано r</p>;
    }
    return false;
}
function outputErrorMaxLength(r) {
    if (String(r).length > 9) {
        return <p className="error">r - превышена длина ввода</p>;
    }
    return false;
}
function outputErrorPattern(r) {
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    if (String(r).match(regex) == null) {
        return <p className="error">r - неправильный формат ввода</p>;
    }
    return false;
}
function outputErrorRange(r) {
    const valueR = parseFloat(String(r));
    if (valueR < 1 || valueR > 3) {
        return <p className="error">r - выходит за допустимый диапазон</p>;
    }
    return false;
}

const mapStateToProps = (state) => {
    return { results: state.results, r: state.r };
}
const mapDispatchToProps = (dispatch) => {
    return { addResult: bindActionCreators(actionAddResult, dispatch) };
        //addResult: (results, r, result) => {dispatch(addResult(results, r, result))}
    //};
}

export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);