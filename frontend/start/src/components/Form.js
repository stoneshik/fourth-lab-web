import { Component } from "react";

export class FormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            passwordLogin: '',
            errorMessage: ''
        };
        this.handlingSubmit = this.handlingSubmit.bind(this);
    }

    handlingUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handlingSubmit = (event) => {
        event.preventDefault();
        const errorMessage = this.validateForm();
        if (errorMessage !== false) {
            this.setState({errorMessage: errorMessage});
            return false;
        }
        this.setState({errorMessage: ''});
    }

    validateForm = () => {
        const login = this.state.login;
        const passwordLogin = this.state.passwordLogin;
        return (
            outputErrorRequired(login, passwordLogin) ||
            outputErrorMaxLength(login, passwordLogin) ||
            outputErrorPattern(login, passwordLogin)
        );
    }

    render() {
        return (
            <form onSubmit={(e) => this.handlingSubmit(e)} id="login_form" className="ui-form">
                <h3>Авторизация</h3>
                <div className="form-row">
                    <input type="text" name="login" onChange={this.handlingUserInput}/>
                    <label className="text-input-label">Логин:</label>
                </div>
                <div className="form-row">
                    <input type="password" name="passwordLogin" onChange={this.handlingUserInput}/>
                    <label className="text-input-label">Пароль:</label>
                </div>
                <input type="submit"/>
                {this.state.errorMessage}
            </form>
        );
    }
}


const outputErrorRequired = (login, password) => {
    const errorLabels = [];
    if (login === null || password == null || login === '' || password === '') {
        if (login == null || login === '') {errorLabels.push("логин");}
        if (password == null || password === '') {errorLabels.push("пароль");}
        return <p className="error">{errorLabels.join(", ")} - необходимо заполнить</p>;
    }
    return false;
}
const outputErrorMaxLength = (login, password) => {
    const errorLabels = [];
    const loginResult = String(login).length <= 9;
    const passwordResult = String(password).length <= 9;
    if (!loginResult || !passwordResult) {
        if (!loginResult) {errorLabels.push("логин");}
        if (!passwordResult) {errorLabels.push("пароль");}
        return <p className="error">{errorLabels.join(", ")} - превышена длина ввода</p>;
    }
    return false;
}
const outputErrorPattern = (login, password) => {
    const errorLabels = [];
    const regex = '[a-zA-Z0-9]+';
    const loginResult = String(login).match(regex) != null;
    const passwordResult = String(password).match(regex) != null;
    if (!loginResult || !passwordResult) {
        if (!loginResult) {errorLabels.push("логин");}
        if (!passwordResult) {errorLabels.push("пароль");}
        return <p className="error">{errorLabels.join(", ")} - неправильный формат ввода</p>;
    }
    return false;
}
