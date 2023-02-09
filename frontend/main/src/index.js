import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import store from "./redux/store";


const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <StartPage />
        },
        {
            path: "/main",
            element: <MainPage />
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
