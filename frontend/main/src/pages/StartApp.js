import "../App.css";
import { useForm } from "react-hook-form";


function StartApp() {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };

  return (
      <div className="App">
        <div id="wrapper" className="container">
          <div id="center_col">
            <form onSubmit={handleSubmit(onSubmit)} id="dot_form" className="ui-form">
              <h3>Авторизация</h3>
              <div className="form-row">
                <input
                    {...register("login", {
                      required: true,
                      maxLength: 9,
                      pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                    })}
                />
                <label className="text-input-label">Логин:</label>
              </div>
              <div className="form-row">
                <input
                    {...register("password", {
                      required: true,
                      maxLength: 9,
                      pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                    })}
                />
                <label className="text-input-label">Пароль:</label>
              </div>
              <input type="submit"/>
              {outputErrorRequired(errors?.login?.type, errors?.password?.type)}
              {outputErrorMaxLength(errors?.login?.type, errors?.password?.type)}
              {outputErrorPattern(errors?.login?.type, errors?.password?.type)}
            </form>
          </div>
        </div>
      </div>
  );
}

export default StartApp;

function outputErrorRequired(loginType, passwordType) {
  const errorLabels = [];
  if (loginType === "required" || passwordType === "required") {
    if (loginType === "required") {errorLabels.push("логин");}
    if (passwordType === "required") {errorLabels.push("пароль");}
    return <p className="error">{errorLabels.join(", ")} - необходимо заполнить</p>;
  }
  return false;
}
function outputErrorMaxLength(loginType, passwordType) {
  const errorLabels = [];
  if (loginType === "maxLength" || passwordType === "maxLength") {
    if (loginType === "maxLength") {errorLabels.push("логин");}
    if (passwordType === "maxLength") {errorLabels.push("пароль");}
    return <p className="error">{errorLabels.join(", ")} - превышена длина ввода</p>;
  }
  return false;
}
function outputErrorPattern(loginType, passwordType) {
  const errorLabels = [];
  if (loginType === "pattern" || passwordType === "pattern") {
    if (loginType === "pattern") {errorLabels.push("логин");}
    if (passwordType === "pattern") {errorLabels.push("пароль");}
    return <p className="error">{errorLabels.join(", ")} - неправильный формат ввода</p>;
  }
  return false;
}