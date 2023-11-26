import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TaxContextProvider } from './contexts/tax-context.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TaxContextProvider>
      <App />
    </TaxContextProvider>
  </React.StrictMode>
);
