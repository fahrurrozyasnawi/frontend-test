import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import themes from "./themes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={themes}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
