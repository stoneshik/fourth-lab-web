import React, { Component } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Slider } from 'primereact/slider';
import * as Utils from "./utils";


export class MainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lazyItems: [],
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
        console.log(this.state);
        event.preventDefault();
        if (!this.validateForm()) {return false;}
    }

    validateForm() {
        const x = this.state.selectedValuesX;
        const y = this.state.valueY;
        const r = this.state.selectedValuesR;
        return !(
            Utils.outputErrorRequired(x, y, r) !== false ||
            Utils.outputErrorMaxLength(x, y, r) !== false ||
            Utils.outputErrorPattern(x, y, r) !== false ||
            Utils.outputErrorRange(x, y, r) !== false ||
            Utils.outputErrorAmountSelect(x, r) !== false
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

    render() {
        return (
            <form onSubmit={this.handleSubmit} id="dot_form" className="ui-form">
                <h3>Проверка попадания точки</h3>
                <div className="form-row">
                    <label className="text-input-label">Значение X:</label>
                    <MultiSelect value={this.state.selectedValuesX}
                                 options={this.valuesX}
                                 onChange={(e) =>
                                     this.setState({ selectedValuesX: e.value })}
                                 optionLabel="name" placeholder="Выбрать X"/>
                </div>
                <div className="form-row">
                    <label className="text-input-label">Значение Y: {this.state.valueY}</label>
                    <Slider value={this.state.valueY} min={-5} max={5}
                            onChange={(e) => this.setState({ valueY: e.value })}/>
                </div>
                <div className="form-row">
                    <label className="text-input-label">Значение R:</label>
                    <MultiSelect value={this.state.selectedValuesR}
                                 options={this.valuesR}
                                 onChange={(e) =>
                                     this.setState({ selectedValuesR: e.value })}
                                 optionLabel="name" placeholder="Выбрать R"/>
                </div>
                <input type="submit"/>
                {Utils.outputErrorRequired(this.state.selectedValuesX, this.state.valueY, this.state.selectedValuesR)}
                {Utils.outputErrorMaxLength(this.state.selectedValuesX, this.state.valueY, this.state.selectedValuesR)}
                {Utils.outputErrorPattern(this.state.selectedValuesX, this.state.valueY, this.state.selectedValuesR)}
                {Utils.outputErrorRange(this.state.selectedValuesX, this.state.valueY, this.state.selectedValuesR)}
                {Utils.outputErrorAmountSelect(this.state.selectedValuesX, this.state.selectedValuesR)}
            </form>
        )
    }
}