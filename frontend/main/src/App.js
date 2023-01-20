import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import React from "react";

import { DotsManager, CanvasComponent } from './сanvas';
import { MainForm } from './MainForm';


function App() {
  const canvas = <CanvasComponent/>;

  return (
    <div className="App">
      <div id="wrapper" className="container">
        <div id="left_col">
          {canvas}
          <div id="canvas_error" className="error"></div>
        </div>
        <div id="center_col">
          <MainForm />
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
