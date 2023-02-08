import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createStore } from "redux";
import cartReducer from './redux/reducers';
import { Provider } from 'react-redux';

import StartApp from './pages/StartApp';
import MainApp from './pages/MainApp';


const store = createStore(cartReducer);

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
