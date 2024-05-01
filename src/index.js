import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './context/ShopContext';
import { ClerkProvider } from '@clerk/clerk-react'
// Import your publishable key
const PUBLISHABLE_KEY = "pk_test_c3VyZS1mZXJyZXQtMzUuY2xlcmsuYWNjb3VudHMuZGV2JA"

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </ShopContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
