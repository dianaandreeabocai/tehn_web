import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginCtxWrapper from "./store/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginCtxWrapper>
        <App />
    </LoginCtxWrapper>
  </React.StrictMode>
);

reportWebVitals()