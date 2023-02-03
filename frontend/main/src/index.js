import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import StartApp from './StartApp'
import MainApp from './MainApp';

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
    <RouterProvider router={router}/>
  </React.StrictMode>
);
