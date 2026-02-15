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
import { isAndroidOnWebView } from "./util/useragent.ts";

if (isAndroidOnWebView()) {
  // Initialize NoSleep to prevent the device from sleeping during meditation
  // This is a workaround for the fact that on Android, within a web view the Wake Lock API seems buggy: it can activate,
  // deactivate but CANNOT reactivate after deactivation
  const noSleep = new NoSleep();
  noSleep.enable();
}

configuration(mainConfiguration);

export const store = configureSofterStore(appComponentDef);
store.configureEffects(
  "/meditationSession",
  mainConfiguration.meditationSessionEffects,
);
store.configureEffects(
  "/newMeditation/settings",
  mainConfiguration.settingsEffects,
);
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
