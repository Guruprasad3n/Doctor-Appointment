import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        {/* <ChakraProvider> */}
        <App />
        {/* </ChakraProvider> */}
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
