import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Moved App import up
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import process from "process";
import "@fortawesome/fontawesome-free/css/all.min.css";

// ✅ Ensure global variables for process
window.global = window;
window.process = process;

// ✅ Ensure Backend Server is Running
const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"], // ✅ Fix WebSocket issue
  reconnection: true, // ✅ Enable reconnection
});

// ✅ Fix PeerJS Connection
const peer = new Peer(undefined, {
  host: "localhost", // Ensure correct hostname
  port: 5001, // Match backend port
  path: "/", // Keep default path
  debug: 3, // Add debugging logs
});

export const SocketContext = React.createContext();
export const PeerContext = React.createContext();

// ✅ Ensure root element exists
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/">
        <SocketContext.Provider value={socket}>
          <PeerContext.Provider value={peer}>
            <App />
          </PeerContext.Provider>
        </SocketContext.Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("❌ Root element not found!");
}

reportWebVitals();
