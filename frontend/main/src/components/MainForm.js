import { MultiSelect } from "primereact/multiselect";
import { Slider } from "primereact/slider";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionPassingR } from "../redux/actions";


class MainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lazyItems: [],
            errorMessage: '',
            lazyLoading: false,
            selectedValuesX: [{name: '0', code: '0'}],
            valueY: 0,
            selectedValuesR: [{name: '1', code: '1'}],
            selectAll: false
        };
        this.valuesX = [
            {name: '-5', code: '-5'},
            {name: '-4', code: '-4'},
            {name: '-3', code: '-3'},
            {name: '-2', code: '-2'},
            {name: '-1', code: '-1'},
            {name: '0', code: '0'},
            {name: '1', code: '1'},
            {name: '2', code: '2'},
            {name: '3', code: '3'}
        ];
        this.valuesR = [
            {name: '-5', code: '-5'},
            {name: '-4', code: '-4'},
            {name: '-3', code: '-3'},
            {name: '-2', code: '-2'},
            {name: '-1', code: '-1'},
            {name: '0', code: '0'},
            {name: '1', code: '1'},
            {name: '2', code: '2'},
            {name: '3', code: '3'}
        ];
        this.valueSelectTemplate = this.valueSelectTemplate.bind(this);
        this.selectedValueSelectTemplate = this.selectedValueSelectTemplate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const errorMessage = this.validateForm();
        if (errorMessage !== false) {
            this.setState({errorMessage: errorMessage});
            return false;
        }
        this.setState({errorMessage: ''});

    }
    validateForm() {
        const x = this.state.selectedValuesX;
        const y = this.state.valueY;
        const r = this.state.selectedValuesR;
        return (
            outputErrorRequired(x, y, r) ||
            outputErrorMaxLength(x, y, r) ||
            outputErrorPattern(x, y, r) ||
            outputErrorRange(x, y, r) ||
            outputErrorAmountSelect(x, r)
        );
    }
    valueSelectTemplate(option) {
        return (
            <div className="country-item">
                <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                <div>{option.name}</div>
            </div>
        );
    }
    selectedValueSelectTemplate(option) {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} />
                    <div>{option.name}</div>
                </div>
            );
        }
        return "Выбор значения";
    }
    handlingPassingR(e) {
        this.setState({ selectedValuesR: e.value });
        if (e.value.length === undefined || e.value.length == null) {
            this.props.passingR([e.value.code]);
            return;
        }
        const result = [];
        for (let i=0; i < e.value.length; i++) {
            result[i] = e.value[i].code;
        }
        this.props.passingR(result);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} id="dot_form" className="ui-form">
                <h3>Проверка попадания точки</h3>
                <div className="form-row">
                    <label className="text-input-label">Значение X:</label>
                    <MultiSelect
                        value={this.state.selectedValuesX}
                        options={this.valuesX}
                        onChange={(e) => this.setState({ selectedValuesX: e.value })}
                        optionLabel="name" placeholder="Выбрать X" id="x"/>
                </div>
                <div className="form-row">
                    <label className="text-input-label">Значение Y: {this.state.valueY}</label>
                    <Slider
                        value={this.state.valueY} min={-5} max={5}
                        onChange={(e) => this.setState({ valueY: e.value })}
                        id="y"/>
                </div>
                <div className="form-row">
                    <label className="text-input-label">Значение R:</label>
                    <MultiSelect
                        value={this.state.selectedValuesR}
                        options={this.valuesR}
                        onChange={(e) => this.handlingPassingR(e)}
                        optionLabel="name" placeholder="Выбрать R" id="r"/>
                </div>
                <input type="submit"/>
                {this.state.errorMessage}
            </form>
        )
    }
}

function outputErrorRequired(x, y, r) {
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
function outputErrorMaxLength(x, y, r) {
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
function outputErrorPattern(x, y, r) {
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
function outputErrorRange(x, y, r) {
    const errorLabels = [];
    let resultX = true;
    let resultY = true;
    let resultR = true;
    for (let i=0; i < x.length; i++) {
        const valueX = parseFloat(String(x[i]['code']));
        if (valueX < -5 || valueX > 3) {resultX = false; break;}
    }
    const valueY = parseFloat(String(y));
    if (valueY < -5 || valueY > 3) {resultY = false;}
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
function outputErrorAmountSelect(x, r) {
    if (x.length > 1 && r.length > 1 && x.length !== r.length) {
        return <p className="error">x и r - должны иметь одинаковое количество выбранных элементов, либо для одного из этих параметров должен быть выбран один элемент</p>;
    }
    return false;
}

const mapStateToProps = (state) => {
    return { r: state.r };
}
const mapDispatchToProps = (dispatch) => {
    return { passingR: bindActionCreators(actionPassingR, dispatch) };
}

export const MainFormContainer = connect(mapStateToProps, mapDispatchToProps)(MainForm);

