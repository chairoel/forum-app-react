import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/style.css";
import { Provider } from "react-redux";
import store from "./states";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>
);
