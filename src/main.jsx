import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import AdminApp from '@/admin/AdminApp';
import '@/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = window.location.pathname.startsWith('/admin');

root.render(
  <React.StrictMode>{isAdmin ? <AdminApp /> : <App />}</React.StrictMode>
);
