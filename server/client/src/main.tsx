import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChatMessageProvider } from "./hooks/useChat.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChatMessageProvider>
      <App />
    </ChatMessageProvider>
  </React.StrictMode>,
);
