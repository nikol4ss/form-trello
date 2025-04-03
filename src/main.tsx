import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RequestForm from "./components/form";
import { ThemeProvider } from "./components/theme-provider"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RequestForm />
    </ThemeProvider>
  </StrictMode>
);
