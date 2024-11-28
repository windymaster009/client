import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'node_modules/@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
const element = <FontAwesomeIcon icon={faCoffee} />
root.render(
  
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
