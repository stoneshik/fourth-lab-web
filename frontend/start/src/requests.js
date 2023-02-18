import $ from "jquery";


export const loginFormRequest = (login, password) => {
    $.post({
        url: "../api/user/auth",
        data: { "user": String(JSON.stringify({"username": login, "password": password})) }
    }).done(function(data) {
        console.log(data);
        window.location.replace("/main");
    });
}

export const registerFormRequest = (login, password) => {
    $.post({
        url: "../api/user/registration",
        data: { "user": String(JSON.stringify({"username": login, "password": password})) }
    }).done(function(data) {
        console.log(data);
        window.location.replace("/main");
    });
}
