import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { GlobalProvider } from "./context/Provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import NotFound from "./components/NotFound/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/:group" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </GlobalProvider>
);
