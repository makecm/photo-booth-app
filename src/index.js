import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppStateProvider } from "./providers/appState";
import 'minireset.css';

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
