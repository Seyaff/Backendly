import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./context/query-provider.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider>
      <QueryProvider>
        <App />
        <Toaster richColors duration={3000} />
      </QueryProvider>
    </ThemeProvider>
  </BrowserRouter>
);
