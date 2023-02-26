import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { api } from "./state/api";
// import { CalculatorApi } from "./state/calculatorApi";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // calculate:CalculatorApi
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
