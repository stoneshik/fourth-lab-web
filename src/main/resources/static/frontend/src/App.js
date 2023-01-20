import './App.css';
import "primeicons/primeicons.css";
import React from "react";
import { useForm } from "react-hook-form";
import * as Util from './utils';
import { DotsManager, CanvasComponent, Canvas } from './Canvas';


function App() {
  const canvas = <CanvasComponent/>;

  /* Обработка формы */
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };
  /* Обработка формы */

  return (
    <div className="App">
      <div id="wrapper" className="container">
        <div id="left_col">
          {canvas}
          <div id="canvas_error" className="error"></div>
        </div>
        <div id="center_col">
          <form onSubmit={handleSubmit(onSubmit)} id="dot_form" className="ui-form">
            <h3>Проверка попадания точки</h3>
            <div className="form-row">
              <input
                  {...register("x", {
                    required: true,
                    maxLength: 9,
                    pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                    min: -5,
                    max: 3
                  })}
              />
              <label className="text-input-label">X:</label>
            </div>
            <div className="form-row">
              <input
                  {...register("y", {
                    required: true,
                    maxLength: 9,
                    pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                    min: -5,
                    max: 3
                  })}
              />
              <label className="text-input-label">Y:</label>
            </div>
            <div className="form-row">
              <input
                  {...register("r", {
                    required: true,
                    maxLength: 9,
                    pattern: /^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$/,
                    min: 1,
                    max: 4
                  })}
              />
              <label className="text-input-label">R:</label>
            </div>
            <input type="submit"/>
            {Util.outputErrorRequired(errors?.x?.type, errors?.y?.type, errors?.r?.type)}
            {Util.outputErrorMaxLength(errors?.x?.type, errors?.y?.type, errors?.r?.type)}
            {Util.outputErrorPattern(errors?.x?.type, errors?.y?.type, errors?.r?.type)}
            {Util.outputErrorRange(errors?.x?.type, errors?.y?.type, errors?.r?.type)}
          </form>
        </div>
        <div id="right_col">
          <h2>Результаты проверки</h2>
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
            <tbody>
            <tr className="success">
              <td>Попала</td>
              <td>0.6863</td>
              <td>-0.1373</td>
              <td>1.0</td>
              <td>14:9:25</td>
              <td>39.488 мкс</td>
            </tr>
            <tr className="success">
              <td>Попала</td>
              <td>-0.1765</td>
              <td>0.402</td>
              <td>1.0</td>
              <td>14:9:26</td>
              <td>47.086 мкс</td>
            </tr>
            <tr className="fail">
              <td>Не попала</td>
              <td>0.9608</td>
              <td>0.5588</td>
              <td>1.0</td>
              <td>17:17:11</td>
              <td>40.956 мкс</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
