import $ from "jquery";


export const loginFormRequest = (form, login, password) => {
    $.post({
        url: "../api/user/auth",
        data: { "user": String(JSON.stringify({"username": login, "password": password})) }
    }).done(function(data) {
        console.log(data);
        const errorMessage = data['errorMessage'];
        if (errorMessage === "") {
            window.location.replace("/main");
        }
        if (errorMessage === undefined) {
            return;
        }
        form.setState({errorMessage: <p className="error">{errorMessage}</p>});
    });
}

export const registerFormRequest = (form, login, password) => {
    $.post({
        url: "../api/user/registration",
        data: { "user": String(JSON.stringify({"username": login, "password": password})) }
    }).done(function(data) {
        console.log(data);
        const errorMessage = data['errorMessage'];
        if (errorMessage === "") {
            window.location.replace("/main");
        }
        if (errorMessage === undefined) {
            return;
        }
        form.setState({errorMessage: <p className="error">{errorMessage}</p>});
    });
}
