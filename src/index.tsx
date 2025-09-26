import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConvexProvider, ConvexReactClient} from "convex/react";

const convexUrl: string = process.env.REACT_APP_CONVEX_URL ?? "";
const convex = new ConvexReactClient(convexUrl);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ConvexProvider client={convex}>
          <App />
      </ConvexProvider>
  </React.StrictMode>
);
reportWebVitals();
