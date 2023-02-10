import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import MainPage from "./pages/MainPage";
import store from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <MainPage/>
      </Provider>
  </React.StrictMode>
);
