import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import StartApp from "./pages/StartApp";
import MainApp from "./pages/MainApp";
import store from "./redux/store";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <StartApp />
        },
        {
            path: "/main",
            element: <MainApp />
        }
    ]
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);
