import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./context/query-provider.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { NuqsAdapter } from "nuqs/adapters/react-router";

createRoot(document.getElementById("root")!).render(
 <BrowserRouter>
    <NuqsAdapter>
      <ThemeProvider>
        <QueryProvider>
          <App />
          <Toaster richColors duration={3000} />
        </QueryProvider>
      </ThemeProvider>
    </NuqsAdapter>
  </BrowserRouter>
);
