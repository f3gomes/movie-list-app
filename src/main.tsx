import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalProvider } from "./context/Provider.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
