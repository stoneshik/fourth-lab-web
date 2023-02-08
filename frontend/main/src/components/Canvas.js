import { Component } from "react";
import { addResult } from '../redux/actions';
import { connect } from 'react-redux';

import { Canvas } from "../utils/Canvas"
import { Result } from "./Results";

export class CanvasComponent extends Component {
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

    handleClick(event) {
        const elementR = document.querySelector('#r .p-multiselect-label');
        if (elementR === undefined || elementR == null) {
            return;
        }
        let r = elementR.innerText.trim().split(',')[0];
        this.setState({valueR: r});
        if (!this.validateR(r)) {
            return;
        }
        r = parseFloat(r);
        const offsetX = event.clientX - event.target.offsetLeft;
        const offsetY = event.clientY - event.target.offsetTop;
        const xy = this.canvas.calcCoordinates(offsetX, offsetY, r);
        const dotsManager = this.canvas.dotsManager;
        if (dotsManager.r !== r) {
            dotsManager.cleanDots();
        }
        dotsManager.r = r;
        dotsManager.addDot(
            dotsManager.newDot(true, xy['x'], xy['y'], r)
        );
        this.canvas.drawCanvas();
        console.log(this.props);
        this.props.addResult(new Result(true, xy['x'], xy['y'], r, '12:40:50', 1111));
        console.log(this.props);
        //Main.getInstance().tableResults.resultsManager.addResults(new Result(true, xy['x'], xy['y'], r, '12:40:50', 1111));
        //Main.getInstance().tableResults.updateResults();
        //console.log(this.tableResults);
        console.log(r);
        console.log(xy)
        console.log(event);
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

const mapStateToProps = (state) => {
    return {
        results: state.results
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addResult: (result) => {dispatch(addResult(result))}
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

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent)