import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "/node_modules/primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "reactflow/dist/style.css";
import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";

import App from "./App.tsx";
import appStore from "./store/appStore";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <StoreProvider store={appStore}>
        <App />
      </StoreProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
