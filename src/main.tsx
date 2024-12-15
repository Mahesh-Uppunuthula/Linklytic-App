import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const ogConcoleWarn = console.warn;

console.warn = (...args) => {
  if (args[0]?.includes("React Router Future Flag Warning")) return;
  ogConcoleWarn(...args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
