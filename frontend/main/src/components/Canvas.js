import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionAddResult } from "../redux/actions";
import { Canvas } from "../utils/Canvas";
import { addNewDotsRequest } from "../requests";


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

        const dotsCords = [{"x": parseFloat(xy['x']), "y": parseFloat(xy['y']), "r": r}];
        addNewDotsRequest(dotsCords, this.props.addResult, this.props);
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
    updateCanvas(results, counter) {
        if (results === undefined || results.length === undefined || this.canvas.canvasObj.canvas === undefined) {
            return <div></div>;
        }
        const dotsManager = this.canvas.dotsManager;
        dotsManager.cleanDots();
        if (results.length === 0) {
            this.canvas.drawCanvas();
            return <div></div>;
        }
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
                <canvas id="canvas" height="500" width="500" onClick={(e) => this.handleClick(e)}></canvas>
                {this.state.errorMessage}
                {this.updateCanvas(this.props.results, this.props.counter)}
            </div>
        );
    }
}

function outputErrorRequired(rValues) {
    if (rValues == null ||rValues.length === undefined || rValues.length === 0) {
        return <p className="error">???? ?????????????? r</p>;
    }
    return false;
}
function outputErrorSelected(rValues) {
    if (rValues.length > 1) {
        return <p className="error">?????????????? ?????????? ???????????? ???????????????? r</p>;
    }
    return false;
}
function outputErrorMaxLength(rValues) {
    if (String(rValues).length > 9) {
        return <p className="error">?????????????????? ?????????? ?????????? r</p>;
    }
    return false;
}
function outputErrorPattern(rValues) {
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    if (String(rValues).match(regex) == null) {
        return <p className="error">???????????????????????? ???????????? ?????????? r</p>;
    }
    return false;
}
function outputErrorRange(rValues) {
    const valueR = parseFloat(String(rValues));
    if (valueR < 1 || valueR > 3) {
        return <p className="error">r ?????????????? ???? ???????????????????? ????????????????</p>;
    }
    return false;
}

const mapStateToProps = (state) => {
    return { results: state.results, r: state.r, counter: state.counter };
}
const mapDispatchToProps = (dispatch) => {
    return { addResult: bindActionCreators(actionAddResult, dispatch) };
}

export const CanvasContainer = connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);
