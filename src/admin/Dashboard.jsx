import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import SideMenu from './SideMenu';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = ({ onLogout }) => {
  const { language, t, updateTranslations } = useLanguage();
  const { credentials, updateCredentials } = useAuth();
  const { toast } = useToast();

  const [contactPhone, setContactPhone] = useState(t.footer.contactPhone);
  const [contactEmail, setContactEmail] = useState(t.footer.contactEmail);
  const [contactAddress, setContactAddress] = useState(t.footer.contactAddress);

  const [services, setServices] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      title: t.services[`service${i + 1}Title`] || '',
      text: t.services[`service${i + 1}Text`] || '',
      image: t.services[`service${i + 1}Image`] || '',
    }))
  );

  const [projects, setProjects] = useState(
    Array.from({ length: 4 }, (_, i) => ({
      title: t.projects[`project${i + 1}Title`] || '',
      text: t.projects[`project${i + 1}Text`] || '',
      image: t.projects[`project${i + 1}Image`] || '',
    }))
  );

  const [userName, setUserName] = useState(credentials.username);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleServiceChange = (index, field, value) => {
    setServices((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleProjectChange = (index, field, value) => {
    setProjects((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleServiceFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      handleServiceChange(index, 'image', e.target.result);
    reader.readAsDataURL(file);
  };

  const handleProjectFileUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) =>
      handleProjectChange(index, 'image', e.target.result);
    reader.readAsDataURL(file);
  };

  const handleCredentialSave = () => {
    if (newPassword && newPassword !== confirmPassword) {
      toast({ title: 'كلمتا المرور غير متطابقتين', variant: 'destructive' });
      return;
    }
    updateCredentials(userName, newPassword || credentials.password);
    setNewPassword('');
    setConfirmPassword('');
    toast({ title: 'تم تحديث بيانات الدخول' });
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
    toast({ title: 'تم الحفظ بنجاح' });
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="container mx-auto md:flex gap-6">
        <SideMenu />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex-1 px-6 py-8 bg-white rounded-3xl shadow-xl border border-gray-200 space-y-10"
        >
        <motion.div variants={itemVariants} className="flex justify-between items-center pb-6 border-b border-gray-200">
          <h1
            className="text-3xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #b18344 0%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            لوحة التحكم
          </h1>
          <motion.button
            onClick={onLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            تسجيل الخروج
          </motion.button>
        </motion.div>

        <motion.section id="company" variants={sectionVariants} className="space-y-6">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              background: 'linear-gradient(135deg, #b18344 0%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            معلومات الشركة
          </h2>
          <motion.input
            variants={itemVariants}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] transition-all duration-300"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="رقم الهاتف"
          />
          <motion.input
            variants={itemVariants}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] transition-all duration-300"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
          />
          <motion.input
            variants={itemVariants}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] transition-all duration-300"
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
            placeholder="العنوان"
          />
        </motion.section>

        <motion.section id="account" variants={sectionVariants} className="space-y-6">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              background: 'linear-gradient(135deg, #b18344 0%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            بيانات الدخول
          </h2>
          <input
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="اسم المستخدم"
          />
          <input
            type="password"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="كلمة المرور الجديدة"
          />
          <input
            type="password"
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="تأكيد كلمة المرور"
          />
          <motion.button
            variants={itemVariants}
            onClick={handleCredentialSave}
            className="bg-[#b18344] text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-[#d4a574] transition-colors"
          >
            حفظ بيانات الدخول
          </motion.button>
        </motion.section>

        <motion.section id="services" variants={sectionVariants} className="space-y-6">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              background: 'linear-gradient(135deg, #b18344 0%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            الخدمات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border border-gray-200 p-5 rounded-xl shadow-sm space-y-3 bg-white hover:shadow-md transition-all duration-300"
              >
                <input
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(idx, 'title', e.target.value)
                  }
                  placeholder={`عنوان الخدمة ${idx + 1}`}
                />
                <textarea
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344] h-24"
                  value={service.text}
                  onChange={(e) =>
                    handleServiceChange(idx, 'text', e.target.value)
                  }
                  placeholder={`وصف الخدمة ${idx + 1}`}
                />
                <input
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
                  value={service.image}
                  onChange={(e) =>
                    handleServiceChange(idx, 'image', e.target.value)
                  }
                  placeholder={`رابط صورة الخدمة ${idx + 1}`}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-300 p-2 w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574] transition-colors"
                  onChange={(e) =>
                    handleServiceFileUpload(idx, e.target.files[0])
                  }
                />
                {service.image && (
                  <img src={service.image} alt="Service Preview" className="mt-2 h-20 w-auto object-cover rounded-md" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="projects" variants={sectionVariants} className="space-y-6">
          <h2
            className="text-2xl font-semibold mb-4"
            style={{
              background: 'linear-gradient(135deg, #b18344 0%, #d4a574 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            المشاريع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="border border-gray-200 p-5 rounded-xl shadow-sm space-y-3 bg-white hover:shadow-md transition-all duration-300"
              >
                <input
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(idx, 'title', e.target.value)
                  }
                  placeholder={`عنوان المشروع ${idx + 1}`}
                />
                <textarea
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344] h-24"
                  value={project.text}
                  onChange={(e) =>
                    handleProjectChange(idx, 'text', e.target.value)
                  }
                  placeholder={`وصف المشروع ${idx + 1}`}
                />
                <input
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-[#b18344]"
                  value={project.image}
                  onChange={(e) =>
                    handleProjectChange(idx, 'image', e.target.value)
                  }
                  placeholder={`رابط صورة المشروع ${idx + 1}`}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="border border-gray-300 p-2 w-full rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574] transition-colors"
                  onChange={(e) =>
                    handleProjectFileUpload(idx, e.target.files[0])
                  }
                />
                {project.image && (
                  <img src={project.image} alt="Project Preview" className="mt-2 h-20 w-auto object-cover rounded-md" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.button
          variants={itemVariants}
          onClick={handleSave}
          className="bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full md:w-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          حفظ التغييرات
        </motion.button>
      </motion.div>
    </div>
  </div>
  );
};

export default Dashboard;