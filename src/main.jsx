import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import AdminApp from '@/admin/AdminApp';
import { LanguageProvider } from '@/contexts/LanguageContext';
import '@/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = window.location.pathname.startsWith('/admin');

root.render(
  <React.StrictMode>
    <LanguageProvider>{isAdmin ? <AdminApp /> : <App />}</LanguageProvider>
  </React.StrictMode>
);
