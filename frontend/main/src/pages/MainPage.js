import "../App.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

import { CanvasContainer } from "../components/Canvas";
import { MainFormContainer } from "../components/MainForm";
import { TableResultsContainer } from "../components/Results";
import store from "../redux/store";

function MainPage() {
  return (
    <div className="App">
      <div id="wrapper" className="container">
        <div id="left_col">
          <CanvasContainer store={store}/>
          <div id="canvas_error" className="error"></div>
        </div>
        <div id="center_col">
          <MainFormContainer store={store}/>
        </div>
        <div id="right_col">
          <h2>Результаты проверки</h2>
          <TableResultsContainer store={store}/>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
