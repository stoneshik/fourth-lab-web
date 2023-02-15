import { Button } from "primereact/button";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionAddResult, actionClearResults } from "../redux/actions";
import { loadDots, clearDotsRequest } from "../requests";


class TableResultsComponent extends Component {
    constructor(props) {
        super(props);
        this.handleClickOnClearButton = this.handleClickOnClearButton.bind(this);
    }

    componentDidMount() {
        this.loadResults();
    }
    loadResults() {
        if (this.props.results.length > 0) {
            return;
        }
        loadDots(this.props.addResult, this.props);
    }
    handleClickOnClearButton() {
        clearDotsRequest(this.props.clearResults, this.props);
    }
    renderResults(results) {
        return (
            <tbody>
            {
                results.map(
                    (result, key) => { return (result.renderResult(key)); }
                )
            }
            </tbody>
        );
    }
    updateResults(results, counter) {
        if (results == null || results.length === 0) {
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
                    {this.renderResults(results)}
                </table>
                <Button id="clean_button" onClick={() => this.handleClickOnClearButton()}>Очистить</Button>
            </div>
        );
    }
    render() {
        return this.updateResults(this.props.results, this.props.counter);
    }
}

const mapStateToProps = (state) => {
    return { results: state.results, r: state.r, counter: state.counter };
}
const mapDispatchToProps = (dispatch) => {
    return {
        addResult: bindActionCreators(actionAddResult, dispatch),
        clearResults: bindActionCreators(actionClearResults, dispatch)
    };
}

export const TableResultsContainer = connect(mapStateToProps, mapDispatchToProps)(TableResultsComponent);
