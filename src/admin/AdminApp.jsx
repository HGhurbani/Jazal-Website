import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

const AdminAppContent = () => {
  const { authenticate } = useAuth();
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem('adminLoggedIn') === 'true'
  );

  const handleLogin = (username, password) => {
    if (authenticate(username, password)) {
      localStorage.setItem('adminLoggedIn', 'true');
      setLoggedIn(true);
      toast({ title: 'تم تسجيل الدخول بنجاح' });
    } else {
      toast({ title: 'بيانات الدخول غير صحيحة', variant: 'destructive' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setLoggedIn(false);
    toast({ title: 'تم تسجيل الخروج' });
  };

  return loggedIn ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
};
const AdminApp = () => (
  <AuthProvider>
    <AdminAppContent />
    <Toaster />
  </AuthProvider>
);

export default AdminApp;
