import "../App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { CanvasComponent } from "../components/Canvas";
import { MainForm } from "../components/MainForm";
import { TableResults } from "../components/Results";

function MainApp() {
  return (
    <div className="App">
      <div id="wrapper" className="container">
        <div id="left_col">
          <CanvasComponent/>
          <div id="canvas_error" className="error"></div>
        </div>
        <div id="center_col">
          <MainForm />
        </div>
        <div id="right_col">
          <h2>Результаты проверки</h2>
          <TableResults/>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
