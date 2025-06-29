import React, { createContext, useContext, useEffect, useState } from 'react';

const DEFAULT_CREDS = { username: 'admin', password: 'admin' };
const STORAGE_KEY = 'adminCredentials';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [credentials, setCredentials] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_CREDS;
    } catch {
      return DEFAULT_CREDS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credentials));
  }, [credentials]);

  const updateCredentials = (username, password) => {
    setCredentials({ username, password });
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
