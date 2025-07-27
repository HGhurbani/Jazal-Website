
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Save, 
  Upload, 
  Eye, 
  EyeOff, 
  Settings, 
  Building2, 
  Wrench,
  FolderOpen,
  User,
  Shield,
  CheckCircle,
  AlertCircle,
  Globe,
  Phone,
  Mail,
  MapPin,
  LogOut,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link,
  Edit3
} from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const { language, t, updateTranslations } = useLanguage();
  const { credentials, updateCredentials } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('company');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Company Info State
  const [contactPhone, setContactPhone] = useState(t.footer.contactPhone);
  const [contactEmail, setContactEmail] = useState(t.footer.contactEmail);
  const [contactAddress, setContactAddress] = useState(t.footer.contactAddress);

  // Services State
  const [services, setServices] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      title: t.services[`service${i + 1}Title`] || '',
      text: t.services[`service${i + 1}Text`] || '',
      image: t.services[`service${i + 1}Image`] || '',
    }))
  );

  // Projects State
  const [projects, setProjects] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      title: t.projects[`project${i + 1}Title`] || '',
      text: t.projects[`project${i + 1}Text`] || '',
      image: t.projects[`project${i + 1}Image`] || '',
    }))
  );

  // Credentials State
  const [userName, setUserName] = useState(credentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const tabs = [
    { id: 'company', label: 'معلومات الشركة', icon: Building2 },
    { id: 'services', label: 'الخدمات', icon: Wrench },
    { id: 'projects', label: 'المشاريع', icon: FolderOpen },
    { id: 'account', label: 'إعدادات الحساب', icon: User }
  ];

  const markAsChanged = () => {
    setHasUnsavedChanges(true);
  };

  const handleServiceChange = (index, field, value) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    markAsChanged();
  };

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    markAsChanged();
  };

  const handleFileUpload = (callback) => (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target.result);
    reader.readAsDataURL(file);
    markAsChanged();
  };

  const addService = () => {
    const newService = {
      id: services.length + 1,
      title: '',
      text: '',
      image: ''
    };
    setServices([...services, newService]);
    markAsChanged();
  };

  const removeService = (index) => {
    if (services.length > 1) {
      setServices(services.filter((_, i) => i !== index));
      markAsChanged();
    }
  };

  const addProject = () => {
    const newProject = {
      id: projects.length + 1,
      title: '',
      text: '',
      image: ''
    };
    setProjects([...projects, newProject]);
    markAsChanged();
  };

  const removeProject = (index) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
      markAsChanged();
    }
  };

  const handleCredentialSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast({ 
        title: 'خطأ في كلمة المرور', 
        description: 'كلمتا المرور غير متطابقتين',
        variant: 'destructive' 
      });
      return;
    }
    updateCredentials(userName, newPassword || credentials.password);
    setNewPassword('');
    setConfirmPassword('');
    toast({ 
      title: 'تم التحديث', 
      description: 'تم حفظ بيانات الحساب بنجاح',
    });
  };

  const handleSave = () => {
    const serviceUpdates = {};
    services.forEach((s, idx) => {
      serviceUpdates[`service${idx + 1}Title`] = s.title;
      serviceUpdates[`service${idx + 1}Text`] = s.text;
      serviceUpdates[`service${idx + 1}Image`] = s.image;
    });

    const projectUpdates = {};
    projects.forEach((p, idx) => {
      projectUpdates[`project${idx + 1}Title`] = p.title;
      projectUpdates[`project${idx + 1}Text`] = p.text;
      projectUpdates[`project${idx + 1}Image`] = p.image;
    });

    updateTranslations(language, {
      services: serviceUpdates,
      projects: projectUpdates,
      footer: {
        contactPhone,
        contactEmail,
        contactAddress,
      },
      contact: {
        addressValue: contactAddress,
      },
    });

    setHasUnsavedChanges(false);
    toast({ 
      title: 'تم الحفظ بنجاح', 
      description: 'جميع التغييرات محفوظة وظاهرة للمستخدمين',
    });
  };

  const handlePreviewWebsite = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#b18344] to-[#d4a574] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">لوحة تحكم جزل</h1>
                  <p className="text-sm text-slate-500">إدارة محتوى الموقع</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {hasUnsavedChanges && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-50 text-amber-700 px-3 py-2 rounded-lg border border-amber-200"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">تغييرات غير محفوظة</span>
                </motion.div>
              )}
              
              <button
                onClick={handlePreviewWebsite}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>معاينة الموقع</span>
              </button>

              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-2 bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التغييرات</span>
              </button>

              <button
                onClick={onLogout}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 sticky top-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-right transition-all mb-1 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
              >
                {activeTab === 'company' && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-4">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3 rtl:space-x-reverse">
                        <Building2 className="w-6 h-6 text-[#b18344]" />
                        <span>معلومات الشركة</span>
                      </h2>
                      <p className="text-slate-500 mt-1">إدارة بيانات التواصل والعنوان</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-700">
                          <Phone className="w-4 h-4 text-[#b18344]" />
                          <span>رقم الهاتف</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all"
                          value={contactPhone}
                          onChange={(e) => {
                            setContactPhone(e.target.value);
                            markAsChanged();
                          }}
                          placeholder="+966 XXX XXX XXX"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-700">
                          <Mail className="w-4 h-4 text-[#b18344]" />
                          <span>البريد الإلكتروني</span>
                        </label>
                        <input
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all"
                          value={contactEmail}
                          onChange={(e) => {
                            setContactEmail(e.target.value);
                            markAsChanged();
                          }}
                          placeholder="info@company.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-slate-700">
                          <MapPin className="w-4 h-4 text-[#b18344]" />
                          <span>العنوان</span>
                        </label>
                        <textarea
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all h-24 resize-none"
                          value={contactAddress}
                          onChange={(e) => {
                            setContactAddress(e.target.value);
                            markAsChanged();
                          }}
                          placeholder="العنوان الكامل للشركة"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3 rtl:space-x-reverse">
                          <Wrench className="w-6 h-6 text-[#b18344]" />
                          <span>إدارة الخدمات</span>
                        </h2>
                        <p className="text-slate-500 mt-1">إضافة وتعديل خدمات الشركة</p>
                      </div>
                      <button
                        onClick={addService}
                        className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة خدمة</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {services.map((service, idx) => (
                        <motion.div
                          key={service.id}
                          layout
                          className="border border-slate-200 rounded-xl p-6 space-y-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">خدمة #{idx + 1}</span>
                            {services.length > 1 && (
                              <button
                                onClick={() => removeService(idx)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <input
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                            value={service.title}
                            onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                            placeholder="عنوان الخدمة"
                          />

                          <textarea
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b18344] h-20 resize-none text-sm"
                            value={service.text}
                            onChange={(e) => handleServiceChange(idx, 'text', e.target.value)}
                            placeholder="وصف الخدمة"
                          />

                          <div className="space-y-2">
                            <input
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                              value={service.image}
                              onChange={(e) => handleServiceChange(idx, 'image', e.target.value)}
                              placeholder="رابط الصورة"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                              onChange={(e) => handleFileUpload((result) => handleServiceChange(idx, 'image', result))(e.target.files[0])}
                            />
                          </div>

                          {service.image && (
                            <div className="relative">
                              <img 
                                src={service.image} 
                                alt="معاينة الخدمة" 
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3 rtl:space-x-reverse">
                          <FolderOpen className="w-6 h-6 text-[#b18344]" />
                          <span>إدارة المشاريع</span>
                        </h2>
                        <p className="text-slate-500 mt-1">عرض أعمالك وإنجازاتك</p>
                      </div>
                      <button
                        onClick={addProject}
                        className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة مشروع</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((project, idx) => (
                        <motion.div
                          key={project.id}
                          layout
                          className="border border-slate-200 rounded-xl p-6 space-y-4 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-500">مشروع #{idx + 1}</span>
                            {projects.length > 1 && (
                              <button
                                onClick={() => removeProject(idx)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <input
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                            value={project.title}
                            onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                            placeholder="اسم المشروع"
                          />

                          <textarea
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b18344] h-20 resize-none text-sm"
                            value={project.text}
                            onChange={(e) => handleProjectChange(idx, 'text', e.target.value)}
                            placeholder="وصف المشروع"
                          />

                          <div className="space-y-2">
                            <input
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                              value={project.image}
                              onChange={(e) => handleProjectChange(idx, 'image', e.target.value)}
                              placeholder="رابط الصورة"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                              onChange={(e) => handleFileUpload((result) => handleProjectChange(idx, 'image', result))(e.target.files[0])}
                            />
                          </div>

                          {project.image && (
                            <div className="relative">
                              <img 
                                src={project.image} 
                                alt="معاينة المشروع" 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-4">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3 rtl:space-x-reverse">
                        <Shield className="w-6 h-6 text-[#b18344]" />
                        <span>إعدادات الحساب</span>
                      </h2>
                      <p className="text-slate-500 mt-1">تغيير بيانات تسجيل الدخول</p>
                    </div>

                    <div className="max-w-md space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">اسم المستخدم</label>
                        <input
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="اسم المستخدم"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">كلمة المرور الجديدة</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="اتركه فارغاً للاحتفاظ بالحالي"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">تأكيد كلمة المرور</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b18344] focus:border-transparent transition-all"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="تأكيد كلمة المرور الجديدة"
                        />
                      </div>

                      <button
                        onClick={handleCredentialSave}
                        className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white rounded-xl hover:shadow-lg transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>حفظ التغييرات</span>
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
