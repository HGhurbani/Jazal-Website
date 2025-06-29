import React, { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_CREDS = { username: 'admin', password: 'admin' };
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(DEFAULT_CREDS);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        if (data.credentials) setCredentials(data.credentials);
      })
      .catch(() => {});
  }, []);

  const updateCredentials = (username, password) => {
    setCredentials({ username, password });
    fetch('/api/credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).catch(() => {});
  };

  const authenticate = (username, password) =>
    username === credentials.username && password === credentials.password;

  return (
    <AuthContext.Provider value={{ credentials, updateCredentials, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
