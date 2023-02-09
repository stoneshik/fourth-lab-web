import { Button } from "primereact/button";
import { Component } from "react";

import { getParseTimeInString } from "../utils/util";


export class Result {
    constructor(isHit, x, y, r, timeDispatch, timeLead) {
        this.isHit = isHit;
        this.x = x;
        this.y = y;
        this.r = r;
        this.timeDispatch = timeDispatch;
        this.timeLead = timeLead;
    }
    renderClassName() {
        if (this.isHit) {
            return "success";
        }
        return "fail";
    }
    renderIsHit() {
        if (this.isHit) {
            return 'Попала';
        }
        return 'Не попала';
    }
    renderX() {
        return parseFloat(this.x).toFixed(4);
    }
    renderY() {
        return parseFloat(this.y).toFixed(4);
    }
    renderR() {
        return parseFloat(this.r).toFixed(4);
    }
    renderTimeDispatch() {
        return getParseTimeInString(this.timeDispatch);
    }
    renderTimeLead() {
        return (parseFloat(this.timeLead) * 0.001).toFixed(3) + ' мкс';
    }
    renderResult(key) {
        return (
            <tr className={this.renderClassName()} key={key}>
                <td>{this.renderIsHit()}</td>
                <td>{this.renderX()}</td>
                <td>{this.renderY()}</td>
                <td>{this.renderR()}</td>
                <td>{this.renderTimeDispatch()}</td>
                <td>{this.renderTimeLead()}</td>
            </tr>
        );
    }
}
class ResultsManager {
    constructor() {
        this.results = [];
    }
    loadResults() {
        this.results = [
            new Result(
                true,
                0.6863,
                -0.1373,
                1.0,
                '14:09:25',
                39488
            ),
            new Result(
                true,
                -0.1765,
                0.402,
                1.0,
                '14:09:26',
                47086
            ),
            new Result(
                false,
                0.9608,
                0.5588,
                1.0,
                '17:17:11',
                40956
            )
        ];
    }
    addResults(results) {
        this.results.unshift(results);
    }
    cleanResults() {
        this.results = [];
    }
}

export class TableResults extends Component {
    constructor(props) {
        super(props);
        this.resultsManager = new ResultsManager();
        this.state = {
            results: this.resultsManager.results
        }
    }
    updateResults() {
        this.setState({results: this.resultsManager.results});
    }
    componentDidMount() {
        this.resultsManager.loadResults();
        this.updateResults();
    }
    clean() {
        this.resultsManager.cleanResults();
        this.updateResults();
    }
    renderResults() {
        const results = this.state.results;
        return (<tbody>{
            results.map((result, key) => {
                return (
                    result.renderResult(key)
                )
            })
        }</tbody>);
    }
    render() {
        console.log('rr');
        if (this.state.results == null || this.state.results.length === 0) {
            return (
                <table id="results" className="results">
                    <tbody>
                        <tr><td className="neutral">Пока здесь пусто</td></tr>
                    </tbody>
                </table>
            );
        }
        return (
            <div>
                <table id="results" className="results">
                    <thead>
                    <tr>
                        <th scope="col">Результат</th>
                        <th scope="col">x</th>
                        <th scope="col">y</th>
                        <th scope="col">r</th>
                        <th scope="col">Время отправки</th>
                        <th scope="col">Время обработки</th>
                    </tr>
                    </thead>
                    {this.renderResults()}
                </table>
                <Button id="clean_button" onClick={() => this.clean()}>Очистить</Button>
            </div>
        );
    }
}

