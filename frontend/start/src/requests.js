import $ from "jquery";


export const loginFormRequest = (form, login, password) => {
    $.post({
        url: "../api/user/auth",
        data: { "user": String(JSON.stringify({"username": login, "password": password})) }
    }).done(function(data) {
        console.log(data);
        const error = data['errorMessage'];
        if (error === "") {
            window.location.replace("/main");
        }
        if (error === undefined) {
            return;
        }
        form.setState({errorMessage: <p className="error">{error}</p>});
    });
}

export const registerFormRequest = (form, login, password) => {
    $.post({
        url: "../api/user/registration",
        data: { "user": String(JSON.stringify({"username": login, "password": password})) }
    }).done(function(data) {
        console.log(data);
        const error = data['errorMessage'];
        if (error === "") {
            window.location.replace("/main");
        }
        if (error === undefined) {
            return;
        }
        form.setState({errorMessage: <p className="error">{error}</p>});
    });
}
