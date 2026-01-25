import "./css/main.css";
import "./util/i18n";
import NoSleep from "nosleep.js";

import { configureSofterStore } from "@softer-components/redux-adapter";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { appComponentDef } from "./components/app/app.component.ts";
import { App } from "./components/app/App.tsx";
import { configuration } from "./adapters/configuration.ts";
import { mainConfiguration } from "./main-configuration.ts";

// Initialize NoSleep to prevent the device from sleeping during meditation
// TODO: make it work using wakelock service
const noSleep = new NoSleep();
noSleep.enable();

configuration(mainConfiguration);

export const store = configureSofterStore(appComponentDef);
const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Provider store={store}>
        <App path="/" />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
