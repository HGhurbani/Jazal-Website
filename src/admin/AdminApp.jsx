import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

const AdminApp = () => {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem('adminLoggedIn') === 'true'
  );

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminLoggedIn', 'true');
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setLoggedIn(false);
  };

  return loggedIn ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
};

export default AdminApp;
