import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import firebaseService from '@/lib/firebaseService';
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
  const { language, t, updateTranslations, refreshData, isListening, lastUpdate, translations } = useLanguage();
  const { credentials, updateCredentials } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('company');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  // Sections Content State with enhanced structure
  const [sectionsContent, setSectionsContent] = useState({
    hero: {
      title: t.hero?.title || '',
      subtitle: t.hero?.subtitle || '',
      description: t.hero?.description || '',
      button: t.hero?.button || '',
      demo: t.hero?.demo || '',
      backgroundImage: t.hero?.backgroundImage || '',
      overlayOpacity: t.hero?.overlayOpacity || 0.5
    },
    about: {
      title: t.about?.title || '',
      subtitle: t.about?.subtitle || '',
      description: t.about?.description || '',
      backgroundImage: t.about?.backgroundImage || '',
      cards: [
        {
          id: 1,
          title: t.about?.card1Title || '',
          text: t.about?.card1Text || '',
          icon: t.about?.card1Icon || '',
          image: t.about?.card1Image || ''
        },
        {
          id: 2,
          title: t.about?.card2Title || '',
          text: t.about?.card2Text || '',
          icon: t.about?.card2Icon || '',
          image: t.about?.card2Image || ''
        },
        {
          id: 3,
          title: t.about?.card3Title || '',
          text: t.about?.card3Text || '',
          icon: t.about?.card3Icon || '',
          image: t.about?.card3Image || ''
        }
      ]
    },
    clients: {
      title: t.clients?.title || '',
      subtitle: t.clients?.subtitle || '',
      description: t.clients?.description || '',
      backgroundImage: t.clients?.backgroundImage || '',
      logos: [
        { id: 1, name: t.clients?.client1 || '', logo: t.clients?.client1Logo || '' },
        { id: 2, name: t.clients?.client2 || '', logo: t.clients?.client2Logo || '' },
        { id: 3, name: t.clients?.client3 || '', logo: t.clients?.client3Logo || '' },
        { id: 4, name: t.clients?.client4 || '', logo: t.clients?.client4Logo || '' },
        { id: 5, name: t.clients?.client5 || '', logo: t.clients?.client5Logo || '' },
        { id: 6, name: t.clients?.client6 || '', logo: t.clients?.client6Logo || '' }
      ]
    },
    // testimonials: {
    //   title: t.testimonials?.title || '',
    //   subtitle: t.testimonials?.subtitle || '',
    //   description: t.testimonials?.description || '',
    //   backgroundImage: t.testimonials?.backgroundImage || '',
    //   items: [
    //     {
    //       id: 1,
    //       quote: t.testimonials?.testimonial1Quote || '',
    //       name: t.testimonials?.testimonial1Name || '',
    //       title: t.testimonials?.testimonial1Title || '',
    //       avatar: t.testimonials?.testimonial1Avatar || '',
    //       rating: t.testimonials?.testimonial1Rating || 5
    //       },
    //     {
    //       id: 2,
    //       quote: t.testimonials?.testimonial2Quote || '',
    //       name: t.testimonials?.testimonial2Name || '',
    //       title: t.testimonials?.testimonial2Title || '',
    //       avatar: t.testimonials?.testimonial2Avatar || '',
    //       rating: t.testimonials?.testimonial2Rating || 5
    //       },
    //     {
    //       id: 3,
    //       quote: t.testimonials?.testimonial3Quote || '',
    //       name: t.testimonials?.testimonial3Name || '',
    //       title: t.testimonials?.testimonial3Title || '',
    //       avatar: t.testimonials?.testimonial3Avatar || '',
    //       rating: t.testimonials?.testimonial3Rating || 5
    //       },
    //     {
    //       id: 4,
    //       quote: t.testimonials?.testimonial4Quote || '',
    //       name: t.testimonials?.testimonial4Name || '',
    //       title: t.testimonials?.testimonial4Title || '',
    //       avatar: t.testimonials?.testimonial4Avatar || '',
    //       rating: t.testimonials?.testimonial4Rating || 5
    //       }
    //   ]
    // },
    faq: {
      title: t.faq?.title || '',
      subtitle: t.faq?.subtitle || '',
      description: t.faq?.description || '',
      backgroundImage: t.faq?.backgroundImage || '',
      items: [
        { id: 1, question: t.faq?.q1 || '', answer: t.faq?.a1 || '' },
        { id: 2, question: t.faq?.q2 || '', answer: t.faq?.a2 || '' },
        { id: 3, question: t.faq?.q3 || '', answer: t.faq?.a3 || '' },
        { id: 4, question: t.faq?.q4 || '', answer: t.faq?.a4 || '' }
      ]
    },
    contact: {
      title: t.contact?.title || '',
      subtitle: t.contact?.subtitle || '',
      description: t.contact?.description || '',
      formTitle: t.contact?.formTitle || '',
      formSubtitle: t.contact?.formSubtitle || '',
      backgroundImage: t.contact?.backgroundImage || '',
      mapImage: t.contact?.mapImage || ''
    },
    header: {
      logo: t.header?.logo || '',
      startProject: t.header?.startProject || ''
    }
  });

  const tabs = [
    { id: 'company', label: 'معلومات الشركة', icon: Building2 },
    { id: 'services', label: 'الخدمات', icon: Wrench },
    { id: 'projects', label: 'المشاريع', icon: FolderOpen },
    { id: 'sections', label: 'إدارة الأقسام', icon: Settings },
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

  const handleFileUpload = (callback) => async (file) => {
    if (!file) return;
    try {
      // رفع الصورة إلى Firebase Storage
      const imageUrl = await firebaseService.uploadImage(file, 'website-images');
      callback(imageUrl);
      markAsChanged();
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      toast({ 
        title: 'خطأ في رفع الصورة', 
        description: 'فشل في رفع الصورة، يرجى المحاولة مرة أخرى',
        variant: 'destructive' 
      });
    }
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

  const handleSectionContentChange = (section, field, value) => {
    setSectionsContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    markAsChanged();
  };

  const handleArrayItemChange = (section, arrayField, index, field, value) => {
    setSectionsContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: prev[section][arrayField].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
    markAsChanged();
  };

  const addArrayItem = (section, arrayField, newItem) => {
    setSectionsContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: [...prev[section][arrayField], { ...newItem, id: Date.now() }]
      }
    }));
    markAsChanged();
  };

  const removeArrayItem = (section, arrayField, index) => {
    setSectionsContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayField]: prev[section][arrayField].filter((_, i) => i !== index)
      }
    }));
    markAsChanged();
  };

  const handleImageUpload = (callback) => async (file) => {
    if (!file) return;
    
    // التحقق من نوع الملف
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'خطأ في نوع الملف',
        description: 'يرجى اختيار ملف صورة صالح',
        variant: 'destructive',
      });
      return;
    }

    // التحقق من حجم الملف (حد أقصى 5 ميجابايت)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'خطأ في حجم الملف',
        description: 'يرجى اختيار صورة بحجم أقل من 5 ميجابايت',
        variant: 'destructive',
      });
      return;
    }

    try {
      // رفع الصورة إلى الاستضافة المحلية عبر خدمة FirebaseService
      const imageUrl = await firebaseService.uploadImage(file, 'website-images');
      callback(imageUrl);
      markAsChanged();

      toast({
        title: 'تم رفع الصورة بنجاح',
        description: 'الصورة جاهزة للاستخدام في الاستضافة المحلية',
      });
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      toast({
        title: 'خطأ في رفع الصورة',
        description: 'فشل في رفع الصورة، يرجى المحاولة مرة أخرى',
        variant: 'destructive'
      });
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // تجهيز البيانات المحدثة
      const updatedData = {
        [language]: {
          services: {},
          projects: {},
          footer: {
            contactPhone,
            contactEmail,
            contactAddress,
          },
          contact: {
            addressValue: contactAddress,
          }
        }
      };

      // إضافة بيانات الخدمات
      services.forEach((s, idx) => {
        updatedData[language].services[`service${idx + 1}Title`] = s.title;
        updatedData[language].services[`service${idx + 1}Text`] = s.text;
        updatedData[language].services[`service${idx + 1}Image`] = s.image;
      });

      // إضافة بيانات المشاريع
      projects.forEach((p, idx) => {
        updatedData[language].projects[`project${idx + 1}Title`] = p.title;
        updatedData[language].projects[`project${idx + 1}Text`] = p.text;
        updatedData[language].projects[`project${idx + 1}Image`] = p.image;
      });

      // إضافة بيانات الأقسام الأخرى
      if (sectionsContent.hero) {
        updatedData[language].hero = sectionsContent.hero;
      }
      
      if (sectionsContent.about) {
        updatedData[language].about = {
          title: sectionsContent.about.title,
          subtitle: sectionsContent.about.subtitle,
          description: sectionsContent.about.description,
          backgroundImage: sectionsContent.about.backgroundImage,
          // تحويل مصفوفة البطاقات إلى خصائص فردية
          ...sectionsContent.about.cards.reduce((acc, card, index) => {
            acc[`card${index + 1}Title`] = card.title;
            acc[`card${index + 1}Text`] = card.text;
            acc[`card${index + 1}Icon`] = card.icon;
            acc[`card${index + 1}Image`] = card.image;
            return acc;
          }, {})
        };
      }

      if (sectionsContent.clients) {
        updatedData[language].clients = {
          title: sectionsContent.clients.title,
          subtitle: sectionsContent.clients.subtitle,
          description: sectionsContent.clients.description,
          backgroundImage: sectionsContent.clients.backgroundImage,
          // تحويل مصفوفة الشعارات إلى خصائص فردية
          ...sectionsContent.clients.logos.reduce((acc, logo, index) => {
            acc[`client${index + 1}`] = logo.name;
            acc[`client${index + 1}Logo`] = logo.logo;
            return acc;
          }, {})
        };
      }

      // if (sectionsContent.testimonials) {
      //   updatedData[language].testimonials = {
      //     title: sectionsContent.testimonials.title,
      //     subtitle: sectionsContent.testimonials.subtitle,
      //     description: sectionsContent.testimonials.description,
      //     backgroundImage: sectionsContent.testimonials.backgroundImage,
      //     // تحويل مصفوفة التوصيات إلى خصائص فردية
      //     ...sectionsContent.testimonials.items.reduce((acc, item, index) => {
      //       acc[`testimonial${index + 1}Quote`] = item.quote;
      //       acc[`testimonial${index + 1}Name`] = item.quote;
      //       acc[`testimonial${index + 1}Title`] = item.title;
      //       acc[`testimonial${index + 1}Avatar`] = item.avatar;
      //       acc[`testimonial${index + 1}Rating`] = item.rating;
      //       return acc;
      //     }, {})
      //   };
      // }

      if (sectionsContent.faq) {
        updatedData[language].faq = {
          title: sectionsContent.faq.title,
          subtitle: sectionsContent.faq.subtitle,
          description: sectionsContent.faq.description,
          backgroundImage: sectionsContent.faq.backgroundImage,
          // تحويل مصفوفة الأسئلة إلى خصائص فردية
          ...sectionsContent.faq.items.reduce((acc, item, index) => {
            acc[`q${index + 1}`] = item.question;
            acc[`a${index + 1}`] = item.answer;
            return acc;
          }, {})
        };
      }

      if (sectionsContent.contact) {
        updatedData[language].contact = sectionsContent.contact;
      }

      if (sectionsContent.header) {
        updatedData[language].header = sectionsContent.header;
      }

      // حفظ البيانات مع تحديث الحالة المحلية وترحيلها إلى Firebase
      console.log('البيانات المراد حفظها:', updatedData);
      await updateTranslations(language, updatedData[language]);
      console.log('تم الحفظ بنجاح');

      setHasUnsavedChanges(false);
      toast({ 
        title: 'تم الحفظ بنجاح', 
        description: 'جميع التغييرات محفوظة في قاعدة البيانات وظاهرة للمستخدمين في الوقت الفعلي',
      });
      
      // إظهار رسالة تأكيد إضافية
      setTimeout(() => {
        toast({
          title: 'تم التحديث التلقائي',
          description: 'سيتم تحديث الموقع الرئيسي تلقائياً خلال ثوانٍ قليلة',
        });
      }, 1000);
      
      // إظهار رسالة تأكيد نهائية
      setTimeout(() => {
        toast({
          title: '✅ التحديث مكتمل',
          description: `تم تحديث ${Object.keys(updatedData[language]).length} قسم بنجاح. يمكنك الآن معاينة الموقع الرئيسي.`,
        });
      }, 3000);
    } catch (error) {
      console.error('خطأ في حفظ البيانات:', error);
      
      // رسالة خطأ أكثر تفصيلاً
      let errorMessage = 'فشل في حفظ البيانات، يرجى المحاولة مرة أخرى';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'خطأ في الأذونات، يرجى التحقق من قواعد Firebase';
      } else if (error.code === 'unavailable') {
        errorMessage = 'خطأ في الاتصال، يرجى التحقق من الإنترنت';
      } else if (error.code === 'invalid-argument') {
        errorMessage = 'بيانات غير صحيحة، يرجى التحقق من المدخلات';
      }
      
      toast({ 
        title: 'خطأ في الحفظ', 
        description: errorMessage,
        variant: 'destructive' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreviewWebsite = () => {
    window.open('/', '_blank');
  };

  const handleRefreshData = async () => {
    try {
      toast({ 
        title: 'جاري تحديث البيانات...', 
        description: 'يتم جلب أحدث التحديثات من قاعدة البيانات'
      });
      
      await refreshData();
      
      // إعادة تحميل البيانات في الحقول
      setContactPhone(t.footer.contactPhone);
      setContactEmail(t.footer.contactEmail);
      setContactAddress(t.footer.contactAddress);
      
      setServices(
        Array.from({ length: 9 }, (_, i) => ({
          id: i + 1,
          title: t.services[`service${i + 1}Title`] || '',
          text: t.services[`service${i + 1}Text`] || '',
          image: t.services[`service${i + 1}Image`] || '',
        }))
      );
      
      setProjects(
        Array.from({ length: 4 }, (_, i) => ({
          id: i + 1,
          title: t.projects[`project${i + 1}Title`] || '',
          text: t.projects[`project${i + 1}Text`] || '',
          image: t.projects[`project${i + 1}Image`] || '',
        }))
      );
      
      // إعادة تحميل بيانات الأقسام
      setSectionsContent(prev => ({
        ...prev,
        hero: {
          title: t.hero?.title || '',
          subtitle: t.hero?.subtitle || '',
          description: t.hero?.description || '',
          button: t.hero?.button || '',
          demo: t.hero?.demo || '',
          backgroundImage: t.hero?.backgroundImage || '',
          overlayOpacity: t.hero?.overlayOpacity || 0.5
        },
        about: {
          title: t.about?.title || '',
          subtitle: t.about?.subtitle || '',
          description: t.about?.description || '',
          backgroundImage: t.about?.backgroundImage || '',
          cards: [
            {
              id: 1,
              title: t.about?.card1Title || '',
              text: t.about?.card1Text || '',
              icon: t.about?.card1Icon || '',
              image: t.about?.card1Image || ''
            },
            {
              id: 2,
              title: t.about?.card2Title || '',
              text: t.about?.card2Text || '',
              icon: t.about?.card2Icon || '',
              image: t.about?.card2Image || ''
            },
            {
              id: 3,
              title: t.about?.card3Title || '',
              text: t.about?.card3Text || '',
              icon: t.about?.card3Icon || '',
              image: t.about?.card3Image || ''
            }
          ]
        },
        clients: {
          title: t.clients?.title || '',
          subtitle: t.clients?.subtitle || '',
          description: t.clients?.description || '',
          backgroundImage: t.clients?.backgroundImage || '',
          logos: [
            { id: 1, name: t.clients?.client1 || '', logo: t.clients?.client1Logo || '' },
            { id: 2, name: t.clients?.client2 || '', logo: t.clients?.client2Logo || '' },
            { id: 3, name: t.clients?.client3 || '', logo: t.clients?.client3Logo || '' },
            { id: 4, name: t.clients?.client4 || '', logo: t.clients?.client4Logo || '' },
            { id: 5, name: t.clients?.client5 || '', logo: t.clients?.client5Logo || '' },
            { id: 6, name: t.clients?.client6 || '', logo: t.clients?.client6Logo || '' }
          ]
        },
        faq: {
          title: t.faq?.title || '',
          subtitle: t.faq?.subtitle || '',
          description: t.faq?.description || '',
          backgroundImage: t.faq?.backgroundImage || '',
          items: [
            { question: t.faq?.q1 || '', answer: t.faq?.a1 || '' },
            { question: t.faq?.q2 || '', answer: t.faq?.a2 || '' },
            { question: t.faq?.q3 || '', answer: t.faq?.a3 || '' },
            { question: t.faq?.q4 || '', answer: t.faq?.a4 || '' },
            { question: t.faq?.q5 || '', answer: t.faq?.a5 || '' }
          ]
        },
        contact: {
          title: t.contact?.title || '',
          subtitle: t.contact?.subtitle || '',
          description: t.contact?.description || '',
          backgroundImage: t.contact?.backgroundImage || '',
          formTitle: t.contact?.formTitle || '',
          formSubtitle: t.contact?.formSubtitle || '',
          mapImage: t.contact?.mapImage || ''
        },
        header: {
          startProject: t.header?.startProject || ''
        }
      }));
      
      setHasUnsavedChanges(false);
      
      toast({ 
        title: 'تم تحديث البيانات بنجاح', 
        description: 'تم جلب أحدث التحديثات من قاعدة البيانات'
      });
    } catch (error) {
      console.error('خطأ في تحديث البيانات:', error);
      toast({ 
        title: 'خطأ في تحديث البيانات', 
        description: 'فشل في جلب التحديثات، يرجى المحاولة مرة أخرى',
        variant: 'destructive' 
      });
    }
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
                onClick={handleRefreshData}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                title="تحديث البيانات من قاعدة البيانات"
              >
                <div className="w-4 h-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span>تحديث البيانات</span>
              </button>

              <button
                onClick={async () => {
                  try {
                    toast({ 
                      title: 'اختبار الاتصال...', 
                      description: 'جاري اختبار الاتصال مع Firebase'
                    });
                    
                    // اختبار بسيط للاتصال
                    const testData = { test: 'test-value', timestamp: Date.now() };
                    await updateTranslations(language, { testSection: testData });
                    
                    toast({ 
                      title: '✅ اختبار ناجح', 
                      description: 'الاتصال مع Firebase يعمل بشكل صحيح'
                    });
                  } catch (error) {
                    toast({ 
                      title: '❌ اختبار فاشل', 
                      description: 'فشل في الاتصال مع Firebase: ' + error.message,
                      variant: 'destructive'
                    });
                  }
                }}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                title="اختبار الاتصال مع Firebase"
              >
                <div className="w-4 h-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>اختبار الاتصال</span>
              </button>
              
              <div className="text-xs text-slate-500 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isListening ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span>{isListening ? 'متصل' : 'غير متصل'}</span>
                </div>
                <div>آخر تحديث:</div>
                <div className="font-mono">
                  {new Date(lastUpdate).toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-xs mt-1">
                  {isListening ? '🔄 تحديثات تلقائية' : '⚠️ تحديثات يدوية فقط'}
                </div>
                <div className="text-xs mt-1 text-blue-600">
                  {translations?.lastUpdated ? 
                    `آخر تحديث في Firebase: ${new Date(translations.lastUpdated).toLocaleString('ar-SA')}` : 
                    'لم يتم تحديث Firebase بعد'
                  }
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isSaving}
                className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-2 bg-gradient-to-r from-[#b18344] to-[#d4a574] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>حفظ التغييرات</span>
                  </>
                )}
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

                {activeTab === 'sections' && (
                  <div className="space-y-8">
                    <div className="border-b border-slate-200 pb-4">
                      <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3 rtl:space-x-reverse">
                        <Settings className="w-6 h-6 text-[#b18344]" />
                        <span>إدارة الأقسام</span>
                      </h2>
                      <p className="text-slate-500 mt-1">تحكم كامل بمحتوى جميع أقسام الموقع</p>
                    </div>

                    {/* قسم الهيدر */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                        <span>قسم الهيدر</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">شعار الموقع</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] mb-2"
                            value={sectionsContent.header.logo}
                            onChange={(e) => handleSectionContentChange('header', 'logo', e.target.value)}
                            placeholder="رابط الشعار"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                            onChange={(e) => handleImageUpload((result) => handleSectionContentChange('header', 'logo', result))(e.target.files[0])}
                          />
                          {sectionsContent.header.logo && (
                            <img src={sectionsContent.header.logo} alt="معاينة الشعار" className="w-24 h-12 object-contain mt-2 border rounded" />
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">نص زر البدء</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.header.startProject}
                            onChange={(e) => handleSectionContentChange('header', 'startProject', e.target.value)}
                            placeholder="ابدأ مشروعك"
                          />
                        </div>
                      </div>
                    </div>

                    {/* قسم الهيرو */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                        <span>القسم الرئيسي (Hero)</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الرئيسي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.hero.title}
                            onChange={(e) => handleSectionContentChange('hero', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الفرعي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.hero.subtitle}
                            onChange={(e) => handleSectionContentChange('hero', 'subtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                          <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] h-20 resize-none"
                            value={sectionsContent.hero.description}
                            onChange={(e) => handleSectionContentChange('hero', 'description', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">نص الزر الأساسي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.hero.button}
                            onChange={(e) => handleSectionContentChange('hero', 'button', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">نص زر التواصل</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.hero.demo}
                            onChange={(e) => handleSectionContentChange('hero', 'demo', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">صورة الخلفية</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] mb-2"
                            value={sectionsContent.hero.backgroundImage}
                            onChange={(e) => handleSectionContentChange('hero', 'backgroundImage', e.target.value)}
                            placeholder="رابط صورة الخلفية"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                            onChange={(e) => handleImageUpload((result) => handleSectionContentChange('hero', 'backgroundImage', result))(e.target.files[0])}
                          />
                          {sectionsContent.hero.backgroundImage && (
                            <img src={sectionsContent.hero.backgroundImage} alt="معاينة خلفية الهيرو" className="w-full h-32 object-cover rounded-lg mt-2" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* قسم من نحن */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                          <span>قسم من نحن</span>
                        </h3>
                        <button
                          onClick={() => addArrayItem('about', 'cards', { title: '', text: '', icon: '', image: '' })}
                          className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة بطاقة</span>
                        </button>
                      </div>
                      
                      {/* عام للقسم */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الرئيسي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.about.title}
                            onChange={(e) => handleSectionContentChange('about', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الفرعي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.about.subtitle}
                            onChange={(e) => handleSectionContentChange('about', 'subtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                          <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] h-20 resize-none"
                            value={sectionsContent.about.description}
                            onChange={(e) => handleSectionContentChange('about', 'description', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">صورة خلفية القسم</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] mb-2"
                            value={sectionsContent.about.backgroundImage}
                            onChange={(e) => handleSectionContentChange('about', 'backgroundImage', e.target.value)}
                            placeholder="رابط صورة الخلفية"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                            onChange={(e) => handleImageUpload((result) => handleSectionContentChange('about', 'backgroundImage', result))(e.target.files[0])}
                          />
                        </div>
                      </div>

                      {/* البطاقات */}
                      <div className="space-y-6">
                        <h4 className="font-medium text-slate-700 border-t border-slate-200 pt-4">البطاقات</h4>
                        {sectionsContent.about.cards.map((card, index) => (
                          <div key={card.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-600">البطاقة #{index + 1}</span>
                              {sectionsContent.about.cards.length > 1 && (
                                <button
                                  onClick={() => removeArrayItem('about', 'cards', index)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">العنوان</label>
                                <input
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                                  value={card.title}
                                  onChange={(e) => handleArrayItemChange('about', 'cards', index, 'title', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">الأيقونة</label>
                                <input
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm mb-1"
                                  value={card.icon}
                                  onChange={(e) => handleArrayItemChange('about', 'cards', index, 'icon', e.target.value)}
                                  placeholder="رابط الأيقونة"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                                  onChange={(e) => handleImageUpload((result) => handleArrayItemChange('about', 'cards', index, 'icon', result))(e.target.files[0])}
                                />
                                {card.icon && (
                                  <img src={card.icon} alt="معاينة الأيقونة" className="w-8 h-8 object-contain mt-1 border rounded" />
                                )}
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-600 mb-1">الوصف</label>
                                <textarea
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] h-16 resize-none text-sm"
                                  value={card.text}
                                  onChange={(e) => handleArrayItemChange('about', 'cards', index, 'text', e.target.value)}
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-600 mb-1">صورة البطاقة (اختياري)</label>
                                <input
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm mb-1"
                                  value={card.image}
                                  onChange={(e) => handleArrayItemChange('about', 'cards', index, 'image', e.target.value)}
                                  placeholder="رابط صورة البطاقة"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                                  onChange={(e) => handleImageUpload((result) => handleArrayItemChange('about', 'cards', index, 'image', result))(e.target.files[0])}
                                />
                                {card.image && (
                                  <img src={card.image} alt="معاينة صورة البطاقة" className="w-full h-24 object-cover rounded mt-1" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* قسم العملاء */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                          <span>قسم العملاء</span>
                        </h3>
                        <button
                          onClick={() => addArrayItem('clients', 'logos', { name: '', logo: '' })}
                          className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة عميل</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.clients.title}
                            onChange={(e) => handleSectionContentChange('clients', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الفرعي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.clients.subtitle}
                            onChange={(e) => handleSectionContentChange('clients', 'subtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                          <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] h-20 resize-none"
                            value={sectionsContent.clients.description}
                            onChange={(e) => handleSectionContentChange('clients', 'description', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-700 border-t border-slate-200 pt-4">شعارات العملاء</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sectionsContent.clients.logos.map((client, index) => (
                            <div key={client.id} className="border border-slate-200 rounded-lg p-3 bg-white">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-slate-600">عميل #{index + 1}</span>
                                {sectionsContent.clients.logos.length > 1 && (
                                  <button
                                    onClick={() => removeArrayItem('clients', 'logos', index)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              <div className="space-y-2">
                                <input
                                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs"
                                  value={client.name}
                                  onChange={(e) => handleArrayItemChange('clients', 'logos', index, 'name', e.target.value)}
                                  placeholder="اسم العميل"
                                />
                                <input
                                  className="w-full px-2 py-1 border border-slate-300 rounded text-xs mb-1"
                                  value={client.logo}
                                  onChange={(e) => handleArrayItemChange('clients', 'logos', index, 'logo', e.target.value)}
                                  placeholder="رابط الشعار"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full text-xs file:mr-1 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                                  onChange={(e) => handleImageUpload((result) => handleArrayItemChange('clients', 'logos', index, 'logo', result))(e.target.files[0])}
                                />
                                {client.logo && (
                                  <img src={client.logo} alt={client.name} className="w-full h-12 object-contain border rounded" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* قسم آراء العملاء - تم إلغاؤه */}
                    {/* <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                          <span>قسم آراء العملاء</span>
                        </h3>
                        <button
                          onClick={() => addArrayItem('testimonials', 'items', { quote: '', name: '', title: '', avatar: '', rating: 5 })}
                          className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة شهادة</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.testimonials.title}
                            onChange={(e) => handleSectionContentChange('testimonials', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الفرعي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.testimonials.subtitle}
                            onChange={(e) => handleSectionContentChange('testimonials', 'subtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                          <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] h-20 resize-none"
                            value={sectionsContent.testimonials.subtitle}
                            onChange={(e) => handleSectionContentChange('testimonials', 'description', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-700 border-t border-slate-200 pt-4">الشهادات</h4>
                        {sectionsContent.testimonials.items.map((testimonial, index) => (
                          <div key={testimonial.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-600">الشهادة #{index + 1}</span>
                              {sectionsContent.testimonials.items.length > 1 && (
                                <button
                                  onClick={() => removeArrayItem('testimonials', 'items', index)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">الاسم</label>
                                <input
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                                  value={testimonial.name}
                                  onChange={(e) => handleArrayItemChange('testimonials', 'items', index, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">المنصب</label>
                                <input
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                                  value={testimonial.title}
                                  onChange={(e) => handleArrayItemChange('testimonials', 'items', index, 'title', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">التقييم (1-5)</label>
                                <input
                                  type="number"
                                  min="1"
                                  max="5"
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                                  value={testimonial.rating}
                                  onChange={(e) => handleArrayItemChange('testimonials', 'items', index, 'rating', parseInt(e.target.value))}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">الصورة الشخصية</label>
                                <input
                                  className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm mb-1"
                                  value={testimonial.avatar}
                                  onChange={(e) => handleArrayItemChange('testimonials', 'items', index, 'avatar', e.target.value)}
                                  placeholder="رابط الصورة"
                                />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="w-full text-xs file:mr-2 file:py-1 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                                  onChange={(e) => handleImageUpload((result) => handleArrayItemChange('testimonials', 'items', index, 'avatar', result))(e.target.files[0])}
                                />
                                {testimonial.avatar && (
                                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 object-cover rounded-full mt-1 border" />
                                )}
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-slate-600 mb-1">الشهادة</label>
                                <textarea
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] h-20 resize-none text-sm"
                                  value={testimonial.quote}
                                  onChange={(e) => handleArrayItemChange('testimonials', 'items', index, 'quote', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div> */}

                    {/* قسم الأسئلة الشائعة */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                          <span>قسم الأسئلة الشائعة</span>
                        </h3>
                        <button
                          onClick={() => addArrayItem('faq', 'items', { question: '', answer: '' })}
                          className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 bg-[#b18344] text-white rounded-lg hover:bg-[#d4a574] transition-colors text-sm"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة سؤال</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.faq.title}
                            onChange={(e) => handleSectionContentChange('faq', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الفرعي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.faq.subtitle}
                            onChange={(e) => handleSectionContentChange('faq', 'subtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                          <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] h-20 resize-none"
                            value={sectionsContent.faq.description}
                            onChange={(e) => handleSectionContentChange('faq', 'description', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-700 border-t border-slate-200 pt-4">الأسئلة والأجوبة</h4>
                        {sectionsContent.faq.items.map((faqItem, index) => (
                          <div key={faqItem.id} className="border border-slate-200 rounded-lg p-4 bg-white">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-600">السؤال #{index + 1}</span>
                              {sectionsContent.faq.items.length > 1 && (
                                <button
                                  onClick={() => removeArrayItem('faq', 'items', index)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">السؤال</label>
                                <input
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] text-sm"
                                  value={faqItem.question}
                                  onChange={(e) => handleArrayItemChange('faq', 'items', index, 'question', e.target.value)}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1">الإجابة</label>
                                <textarea
                                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#b18344] h-20 resize-none text-sm"
                                  value={faqItem.answer}
                                  onChange={(e) => handleArrayItemChange('faq', 'items', index, 'answer', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* قسم التواصل */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-[#b18344] rounded-full"></div>
                        <span>قسم التواصل</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.contact.title}
                            onChange={(e) => handleSectionContentChange('contact', 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">العنوان الفرعي</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.contact.subtitle}
                            onChange={(e) => handleSectionContentChange('contact', 'subtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">الوصف</label>
                          <textarea
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] h-20 resize-none"
                            value={sectionsContent.contact.description}
                            onChange={(e) => handleSectionContentChange('contact', 'description', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">عنوان النموذج</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.contact.formTitle}
                            onChange={(e) => handleSectionContentChange('contact', 'formTitle', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">وصف النموذج</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344]"
                            value={sectionsContent.contact.formSubtitle}
                            onChange={(e) => handleSectionContentChange('contact', 'formSubtitle', e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">صورة الخريطة</label>
                          <input
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b18344] mb-2"
                            value={sectionsContent.contact.mapImage}
                            onChange={(e) => handleSectionContentChange('contact', 'mapImage', e.target.value)}
                            placeholder="رابط صورة الخريطة"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b18344] file:text-white hover:file:bg-[#d4a574]"
                            onChange={(e) => handleImageUpload((result) => handleSectionContentChange('contact', 'mapImage', result))(e.target.files[0])}
                          />
                          {sectionsContent.contact.mapImage && (
                            <img src={sectionsContent.contact.mapImage} alt="معاينة الخريطة" className="w-full h-32 object-cover rounded-lg mt-2" />
                          )}
                        </div>
                      </div>
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
