import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/error/ErrorBoundary";
import { logError } from "./components/utils/logger";
import "./index.css";

window.onerror = (message, source, line, column, error) => {
  logError("window.onerror", error || message, {
    source,
    line,
    column,
  });

  return false;
};

window.addEventListener("unhandledrejection", (event) => {
  logError("unhandledrejection", event.reason);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary context="RootApp">
      <App />
    </ErrorBoundary>
  </StrictMode>
);