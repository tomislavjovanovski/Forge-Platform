import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { initializeMockServiceWorker } from './mocks/browser';
import './index.css';
if (import.meta.env.DEV) {
    void initializeMockServiceWorker();
}
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(App, {}) }) }));
//# sourceMappingURL=main.js.map