
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Shield, Eye, EyeOff } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      onLogin(username, password);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#b18344]/5 to-[#d4a574]/5"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-[#b18344] to-[#d4a574] flex items-center justify-center shadow-lg"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-2">لوحة تحكم جزل</h1>
          <p className="text-slate-500">إدارة محتوى الموقع الإلكتروني</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-2"
          >
            <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-700">
              <User className="w-4 h-4 text-[#b18344]" />
              <span>اسم المستخدم</span>
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all pl-4 pr-12"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-2"
          >
            <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-700">
              <Lock className="w-4 h-4 text-[#b18344]" />
              <span>كلمة المرور</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all pl-12 pr-4"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري تسجيل الدخول...</span>
              </div>
            ) : (
              'تسجيل الدخول'
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center text-sm text-slate-500"
        >
          <p>محمي بأعلى معايير الأمان</p>
          <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse mt-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-green-600 font-medium">اتصال آمن</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
