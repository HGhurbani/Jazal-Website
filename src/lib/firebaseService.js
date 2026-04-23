import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  deleteField
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

// خدمة إدارة البيانات في Firebase
class FirebaseService {
  // الحصول على جميع البيانات
  async getWebsiteData() {
    try {
      const docRef = doc(db, 'website', 'data');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // إذا لم تكن البيانات موجودة، قم بإنشائها بالبيانات الافتراضية
        const defaultData = this.getDefaultData();
        await this.saveWebsiteData(defaultData);
        return defaultData;
      }
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      throw error;
    }
  }

  // حفظ جميع البيانات مع دمج البيانات الجديدة مع الموجودة
  async saveWebsiteData(newData) {
    try {
      console.log('🔄 بدء حفظ البيانات في Firebase...');
      console.log('📝 البيانات الجديدة:', newData);
      
      const docRef = doc(db, 'website', 'data');
      
      // الحصول على البيانات الموجودة أولاً
      const existingDoc = await getDoc(docRef);
      let existingData = {};
      
      if (existingDoc.exists()) {
        existingData = existingDoc.data();
        console.log('📊 البيانات الموجودة:', existingData);
      } else {
        console.log('⚠️ لا توجد بيانات موجودة، سيتم إنشاء مستند جديد');
      }
      
      // دمج البيانات الجديدة مع الموجودة
      const mergedData = this.mergeData(existingData, newData);
      
      // إضافة timestamp للتحديث
      mergedData.lastUpdated = new Date().toISOString();
      mergedData.lastUpdatedBy = 'admin';
      
      console.log('🔗 البيانات المدمجة:', mergedData);
      
      // حفظ البيانات باستخدام setDoc مع merge: true
      await setDoc(docRef, mergedData, { merge: true });
      console.log('✅ تم حفظ البيانات بنجاح');
      
      // التأكد من حفظ البيانات
      const savedDoc = await getDoc(docRef);
      if (savedDoc.exists()) {
        const savedData = savedDoc.data();
        console.log('✅ تم التحقق من حفظ البيانات:', savedData);
        console.log('🕒 وقت آخر تحديث:', savedData.lastUpdated);
        
        // مقارنة البيانات المحفوظة مع البيانات المراد حفظها
        const isDataSaved = JSON.stringify(savedData) === JSON.stringify(mergedData);
        console.log('🔍 البيانات محفوظة بشكل صحيح:', isDataSaved);
        
        if (!isDataSaved) {
          console.warn('⚠️ تحذير: البيانات المحفوظة لا تتطابق مع البيانات المراد حفظها');
        }
      } else {
        console.error('❌ فشل في حفظ البيانات: المستند غير موجود بعد الحفظ');
      }
      
      return true;
    } catch (error) {
      console.error('❌ خطأ في حفظ البيانات:', error);
      console.error('🔍 تفاصيل الخطأ:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // دمج البيانات الجديدة مع الموجودة
  mergeData(existingData, newData) {
    const merged = { ...existingData };
    
    // دمج البيانات العربية
    if (newData.ar) {
      merged.ar = this.mergeDataWithReplacement(merged.ar || {}, newData.ar);
    }
    
    // دمج البيانات الإنجليزية
    if (newData.en) {
      merged.en = this.mergeDataWithReplacement(merged.en || {}, newData.en);
    }
    
    return merged;
  }

  // دمج البيانات مع استبدال الأقسام المحددة بالكامل
  mergeDataWithReplacement(existing, newObj) {
    const merged = { ...existing };
    
    // الأقسام التي يجب استبدالها بالكامل بدلاً من دمجها
    const replaceWholeSections = ['services', 'projects', 'about', 'clients', 'faq', 'hero', 'contact', 'header', 'footer'];
    
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        if (replaceWholeSections.includes(key)) {
          // استبدال القسم بالكامل
          merged[key] = newObj[key];
        } else if (typeof newObj[key] === 'object' && newObj[key] !== null && !Array.isArray(newObj[key])) {
          // دمج الكائنات الأخرى بشكل متكرر
          merged[key] = this.mergeDataWithReplacement(merged[key] || {}, newObj[key]);
        } else {
          // استبدال القيم العادية
          merged[key] = newObj[key];
        }
      }
    }
    
    return merged;
  }

  // دمج الكائنات المتداخلة (للأقسام التي تحتاج دمج)
  mergeNestedObject(existing, newObj) {
    const merged = { ...existing };
    
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        if (typeof newObj[key] === 'object' && newObj[key] !== null && !Array.isArray(newObj[key])) {
          // إذا كان الكائن متداخل، ادمجه بشكل متكرر
          merged[key] = this.mergeNestedObject(merged[key] || {}, newObj[key]);
        } else {
          // إذا كان قيمة عادية، استبدلها
          merged[key] = newObj[key];
        }
      }
    }
    
    return merged;
  }

  // تحديث قسم معين مع دمج البيانات
  async updateSection(section, data) {
    try {
      console.log('🔄 بدء تحديث القسم:', section);
      console.log('📝 بيانات التحديث:', data);
      
      const docRef = doc(db, 'website', 'data');
      
      // الحصول على البيانات الموجودة
      const existingDoc = await getDoc(docRef);
      let existingData = {};
      
      if (existingDoc.exists()) {
        existingData = existingDoc.data();
        console.log('📊 البيانات الموجودة للقسم:', existingData[section]);
      } else {
        console.log('⚠️ لا توجد بيانات موجودة، سيتم إنشاء مستند جديد');
      }
      
      // دمج البيانات الجديدة مع الموجودة في القسم المحدد
      const updatedData = {};
      updatedData[section] = this.mergeNestedObject(existingData[section] || {}, data);
      
      // إضافة timestamp للتحديث
      updatedData.lastUpdated = new Date().toISOString();
      updatedData.lastUpdatedBy = 'admin';
      
      console.log('🔗 البيانات المحدثة للقسم:', updatedData);
      
      await updateDoc(docRef, updatedData);
      console.log('✅ تم تحديث القسم بنجاح');
      
      // التأكد من التحديث
      const updatedDoc = await getDoc(docRef);
      if (updatedDoc.exists()) {
        const finalData = updatedDoc.data();
        console.log('✅ تم التحقق من تحديث القسم:', finalData[section]);
        console.log('🕒 وقت آخر تحديث:', finalData.lastUpdated);
      }
      
      return true;
    } catch (error) {
      console.error('❌ خطأ في تحديث القسم:', error);
      console.error('🔍 تفاصيل الخطأ:', {
        section,
        code: error.code,
        message: error.message
      });
      throw error;
    }
  }

  // رفع صورة إلى Firebase Storage
  async uploadImage(file, path) {
    try {
      const timestamp = Date.now();
      const safeName = `${timestamp}_${file.name}`.replace(/[^a-zA-Z0-9.\-]/g, '_');
      const storageRef = ref(storage, `${path}/${safeName}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      throw error;
    }
  }

  // حذف صورة من Firebase Storage
  async deleteImage(imageUrl) {
    try {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('خطأ في حذف الصورة:', error);
      // لا نريد إيقاف العملية إذا فشل حذف الصورة
    }
  }

  // حذف عدة حقول باستخدام deleteField
  async deleteFields(lang, fields) {
    try {
      console.log('🔄 بدء حذف الحقول:', fields);
      const docRef = doc(db, 'website', 'data');
      const payload = {};
      
      fields.forEach((path) => {
        payload[`${lang}.${path}`] = deleteField();
      });
      
      console.log('📝 بيانات الحذف:', payload);
      
      if (Object.keys(payload).length > 0) {
        await updateDoc(docRef, payload);
        console.log('✅ تم حذف الحقول بنجاح');
      }
      
      return true;
    } catch (error) {
      console.error('❌ خطأ في حذف الحقول:', error);
      throw error;
    }
  }

  // دالة جديدة لحذف قسم كامل واستبداله
  async replaceSection(lang, section, newData) {
    try {
      console.log(`🔄 استبدال قسم ${section} بالكامل`);
      const docRef = doc(db, 'website', 'data');
      
      // الحصول على البيانات الموجودة
      const existingDoc = await getDoc(docRef);
      let existingData = {};
      
      if (existingDoc.exists()) {
        existingData = existingDoc.data();
      }
      
      // إنشاء كائن التحديث
      const updateData = {};
      
      // حذف جميع مفاتيح القسم القديمة
      if (existingData[lang] && existingData[lang][section]) {
        const oldSection = existingData[lang][section];
        Object.keys(oldSection).forEach(key => {
          updateData[`${lang}.${section}.${key}`] = deleteField();
        });
      }
      
      // إضافة البيانات الجديدة
      if (newData) {
        Object.keys(newData).forEach(key => {
          updateData[`${lang}.${section}.${key}`] = newData[key];
        });
      }
      
      // إضافة timestamp
      updateData[`${lang}.lastUpdated`] = new Date().toISOString();
      updateData[`${lang}.lastUpdatedBy`] = 'admin';
      
      console.log('📝 بيانات التحديث:', updateData);
      
      // تنفيذ التحديث
      await updateDoc(docRef, updateData);
      console.log(`✅ تم استبدال قسم ${section} بنجاح`);
      
      return true;
    } catch (error) {
      console.error(`❌ خطأ في استبدال قسم ${section}:`, error);
      throw error;
    }
  }

  // الحصول على البيانات الافتراضية
  getDefaultData() {
    return {
      ar: {
        title: "جزل - شركة تنظيم المعارض والمؤتمرات والفعاليات",
        description: "شركة جزل السعودية الرائدة في تنظيم المعارض والمؤتمرات والفعاليات. خبرة واسعة في تقديم حلول متكاملة لجميع أنواع الفعاليات في المملكة العربية السعودية.",
            nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      projects: "أعمالنا",
      // testimonials: "آراء العملاء",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
    },
        header: {
          startProject: "ابدأ مشروعك",
        },
        hero: {
          mainTitle: "جزل",
          title: "نُتقن الفكرة... ونُبهر في التنفيذ.",
          subtitle: "جزل لتنظيم المعارض والمؤتمرات",
          description: "نحن نحول أحلامك إلى واقع مذهل من خلال تنظيم فعاليات استثنائية تترك أثراً لا يُنسى.",
          button: "اطلب عرض سعر",
          demo: "تواصل معنا",
          trustSecure: "موثوق وآمن",
          trustQuality: "جودة مضمونة",
          trustSatisfaction: "رضا العملاء",
        },
        about: {
          title: "من نحن",
          description: "نحن \"جزل\"، شركة سعودية متخصصة في تصميم وتنفيذ المعارض والمؤتمرات باحترافية عالية، نؤمن أن كل فعالية تمثّل تجربة لا تُنسى، ونعمل على تقديمها بأدق التفاصيل.",
          card1Title: "خبرة متميزة",
          card1Text: "سنوات من الخبرة في تنظيم أكثر من 500 فعالية ناجحة.",
          card2Title: "فريق محترف",
          card2Text: "فريق من الخبراء المتخصصين في جميع جوانب تنظيم الفعاليات.",
          card3Title: "جودة عالية",
          card3Text: "التزام بأعلى معايير الجودة والإبداع في كل مشروع.",
          tagline: "تعرف علينا أكثر",
          learnMore: "اعرف أكثر",
          cta: "ابدأ رحلتك معنا",
        },
        services: {
          title: "خدماتنا",
          description: "نقدم باقة متكاملة من الخدمات لتنظيم الفعاليات بتميّز.",
          service1Title: "تخطيط وتنفيذ الفعاليات",
          service1Text: "من الفكرة إلى التنفيذ بإتقان كامل لكل المراحل.",
          service1Image: "",
          service2Title: "تصميم أجنحة المعارض",
          service2Text: "ابتكار التصاميم وتنفيذها بأعلى جودة ممكنة.",
          service2Image: "",
          service3Title: "إدارة الحضور والتسجيل",
          service3Text: "حلول متكاملة لتنظيم الحضور وتسهيل إجراءات التسجيل.",
          service3Image: "",
          service4Title: "تنظيم ورش العمل",
          service4Text: "تنسيق وإدارة ورش العمل بكفاءة عالية.",
          service4Image: "",
          service5Title: "التصوير والتغطية الإعلامية",
          service5Text: "توثيق احترافي وتصوير شامل للفعاليات.",
          service5Image: "",
          service6Title: "حجز القاعات والخدمات اللوجستية",
          service6Text: "تأمين المواقع وكل ما يلزم من خدمات مساندة.",
          service6Image: "",
          service7Title: "تقديم الهدايا",
          service7Text: "خدمة متخصصة بتجهيز وتوصيل الهدايا المميزة.",
          service7Image: "",
          service8Title: "تقديم العطور والعود ومستحضرات التجميل",
          service8Text: "نوفر أجود أنواع العطور والعود ومنتجات التجميل.",
          service8Image: "",
          service9Title: "الفعاليات الترفيهية",
          service9Text: "تنظيم فعاليات ومهرجانات ترفيهية متنوعة.",
          service9Image: "",
          storeNote: "متاح الآن كمتجر إلكتروني",
          storeBrowse: "تصفح متجرنا جزل",
          button: "اعرف المزيد",
          tagline: "خدماتنا المتميزة",
          mostPopular: "الأكثر طلباً",
          service1Features: ["تصميم معماري متطور", "إشراف هندسي شامل", "ضمان الجودة"],
          service2Features: ["استشارات متخصصة", "فريق خبراء", "حلول مبتكرة"],
          service3Features: ["إدارة المشاريع", "تنفيذ احترافي", "متابعة مستمرة"],
          ctaTitle: "مستعد لبدء مشروعك؟",
          ctaDescription: "احصل على استشارة مجانية واكتشف كيف يمكننا تحويل رؤيتك إلى واقع مميز",
          ctaButton: "احجز استشارتك المجانية",
        },
        projects: {
          title: "مشاريعنا السابقة",
          description: "نفخر بتقديم أفضل الأعمال التي حققت نجاحاً باهراً.",
          featuredTag: "أعمالنا المميزة",
          categoryTrade: "معارض تجارية",
          categoryConference: "مؤتمرات علمية",
          categoryCeremony: "حفلات تكريم",
          project1Title: "معرض الرياض التجاري",
          project1Text: "معرض تجاري متخصص استقطب أكثر من 50,000 زائر.",
          project1Image: "",
          project2Title: "مؤتمر التقنية والابتكار",
          project2Text: "مؤتمر دولي جمع خبراء من 20 دولة.",
          project2Image: "",
          project3Title: "حفل التميز السنوي",
          project3Text: "فعالية تكريمية لأبرز الشخصيات المؤثرة.",
          project3Image: "",
          project4Title: "مهرجان البُر",
          project4Text: "فعالية سنوية تبرز أهمية زراعة وحصاد البُر.",
          project4Image: "",
          exploreAll: "استكشف جميع أعمالنا",
          details: "عرض التفاصيل",
        },
        clients: {
          title: "عملاؤنا",
          description: "نفخر بثقة عملائنا المميزين من مختلف القطاعات.",
          client1: "موبايلي",
          client2: "وزارة الزراعة",
          client3: "وزارة التعليم",
          client4: "وزارة الدفاع",
          client5: "وزارة الداخلية",
          client6: "شركة نيسان",
          tagline: "شركاؤنا في النجاح",
          statSatisfied: "عميل راضٍ",
          statProjects: "مشروع منجز",
          statYears: "سنوات خبرة",
          statSatisfaction: "معدل الرضا",
          projectsWord: "مشروع",
          trustedPartner: "شريك موثوق",
          trustedByLeadersTitle: "معتمدون من قبل الرواد",
          trustedByLeadersDesc: "نفخر بثقة كبرى الشركات والمؤسسات الحكومية بخدماتنا، حيث نقدم حلول متكاملة تلبي أعلى معايير الجودة والاحترافية",
          trustCert3: "الالتزام بالمواعيد",
          categoryEnergy: "طاقة",
          categoryBanks: "بنوك",
          categoryIndustry: "صناعة",
          categoryGovernment: "حكومي",
        },
        testimonials: {
          title: "وش يقولون عملائنا",
          description: "آراء عملاء نفخر بخدمتهم ونسعد بشهادتهم التي تدفعنا للمزيد من الإبداع.",
          tagline: "شهادات نعتز بها",
          testimonial1Quote: "شغلنا مع جزل كان روعة، وطلعو لنا فعالية فوق المتوقع.",
          testimonial1Name: "خالد العامري",
          testimonial1Title: "مدير تنفيذي، شركة التقنية المبتكرة",
          testimonial2Quote: "رتبوا مؤتمرنا السنوي بكل احتراف، من التسجيل لين آخر لحظة.",
          testimonial2Name: "فاطمة الحسن",
          testimonial2Title: "رئيسة اللجنة المنظمة، مؤتمر الطب الحديث",
          testimonial3Quote: "تصاميم جناحنا خطيرة وجذبت الكل، يعطيهم العافية.",
          testimonial3Name: "سلطان المحمد",
          testimonial3Title: "مدير التسويق، شركة الإنماء العقارية",
          testimonial4Quote: "سريعين ومتعاونين لأقصى حد، وما قصروا معنا أبداً.",
          testimonial4Name: "نورة السالم",
          testimonial4Title: "مؤسس، منصة إبداع",
        },
        faq: {
          title: "الأسئلة الشائعة",
          description: "نجيب هنا على بعض الأسئلة التي قد تدور في ذهنك. إذا لم تجد إجابتك، فلا تتردد في التواصل معنا مباشرة.",
          tagline: "لديك سؤال؟",
          q1: "كم مدة التحضير لفعالية؟",
          a1: "من شهر إلى ستة أشهر على حسب حجم الفعالية",
          q2: "هل تقدمون الخدمة في جميع مناطق المملكة؟",
          a2: "نعم، نفخر بتقديم خدماتنا في جميع أنحاء المملكة العربية السعودية. يمتلك فريقنا القدرة اللوجستية والخبرة لتنفيذ الفعاليات الناجحة في أي مدينة.",
          q3: "هل ممكن تصميم جناح خاص؟",
          a3: "بالتأكيد. تصميم الأجنحة الخاصة والمبتكرة هو أحد خدماتنا الأساسية. يعمل فريق التصميم لدينا معكم لابتكار جناح فريد يعكس هوية علامتكم التجارية ويجذب الزوار.",
          q4: "كيف يتم التسعير؟",
          a4: "يتم تحديد السعر بناءً على متطلبات كل مشروع على حدة، بما في ذلك حجم الفعالية، الخدمات المطلوبة، والمواصفات الفنية. نقدم عرض سعر تفصيلي وشفاف بعد فهم كامل لاحتياجاتكم.",
        },
        contact: {
          title: "تواصل معنا",
          description: "نحن هنا لتحويل أفكارك إلى فعاليات استثنائية.",
          phone: "رقم الواتساب",
          email: "البريد الإلكتروني",
          address: "العنوان",
          addressValue: "8133 القديح - حي الندى حي الندى, الرياض RADA8133, المملكة العربية السعودية",
          methodsTitle: "طرق التواصل",
          whatsapp: "واتساب",
          whatsappDescription: "تواصل مباشر وسريع",
          chatButton: "محادثة",
          phoneSub: "للاستفسارات العاجلة",
          addressSub: "موقعنا الرئيسي",
          formTitle: "أرسل رسالتك",
          formSubtitle: "سيتم إرسال رسالتك مباشرة عبر الواتساب",
          sending: "جاري الإرسال...",
          whatsappSubmit: "إرسال ",
          formName: "الاسم",
          formNamePlaceholder: "اسمك الكامل",
          formPhonePlaceholder: "+966 5X XXX XXXX",
          formEmail: "البريد الإلكتروني",
          formMessage: "الرسالة",
          formMessagePlaceholder: "اكتب رسالتك هنا...",
          formButton: "إرسال الرسالة",
        },
        footer: {
          description: "شركة سعودية رائدة في تنظيم المعارض والمؤتمرات والفعاليات، نسعى لتقديم تجارب استثنائية تفوق التوقعات.",
          links: "روابط سريعة",
          follow: "تابعنا",
          rights: "جميع الحقوق محفوظة لـ جزل © 2025 <a href=\"https://roqi.sa/\" target=\"_blank\" rel=\"noopener noreferrer\">ROQI</a> تصميم وتطوير",
          companyTitle: "شركتنا",
          companyDescription: "نقدم خدمات متكاملة في تنظيم المعارض والمؤتمرات والفعاليات بخبرة تتجاوز 15 عاماً في المجال.",
          servicesTitle: "خدماتنا",
          service1Title: "تنظيم المعارض",
          service1Desc: "إدارة متكاملة للمعارض التجارية والمتخصصة",
          service2Title: "تنظيم المؤتمرات",
          service2Desc: "تنسيق شامل للمؤتمرات والندوات",
          service3Title: "إدارة الفعاليات",
          service3Desc: "تنفيذ جميع أنواع الفعاليات باحترافية عالية",
          contactTitle: "تواصل معنا",
          contactAddress: "8133 القديح - حي الندى حي الندى, الرياض RADA8133, المملكة العربية السعودية",
          contactPhone: "+966504447148",
          contactEmail: "Jzl.co@hotmail.com",
          contactHours: "الأحد - الخميس: 8:00 - 17:00",
        },
        toast: {
          successTitle: "تم إرسال رسالتك بنجاح!",
          successDescription: "سنتواصل معك في أقرب وقت ممكن.",
          featureTitle: "🚧 هذه الميزة غير متاحة حالياً",
          featureDescription: "لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀",
        }
      },
      en: {
        title: "Jazal - Exhibitions, Conferences, and Events Management Company",
        description: "Jazal is a leading Saudi company in organizing exhibitions, conferences, and events. We have extensive experience in providing integrated solutions for all types of events in Saudi Arabia.",
        nav: {
          home: "Home",
          about: "About Us",
          services: "Services",
          projects: "Our Work",
          testimonials: "Testimonials",
          faq: "FAQ",
          contact: "Contact Us",
        },
        header: {
          startProject: "Start Your Project",
        },
        hero: {
          mainTitle: "Jazal",
          title: "We master the idea... and excel in execution.",
          subtitle: "Jazal for Exhibition and Conference Management",
          description: "We turn your dreams into stunning reality by organizing exceptional events that leave a lasting impact.",
          button: "Request a Quote",
          demo: "Contact Us",
          trustSecure: "Secure & Safe",
          trustQuality: "Guaranteed Quality",
          trustSatisfaction: "Customer Satisfaction",
        },
        about: {
          title: "About Us",
          description: '"Jazal" is a Saudi company specialized in the professional design and execution of exhibitions and conferences. We believe every event is an unforgettable experience delivered with meticulous attention to detail.',
          card1Title: "Distinguished Experience",
          card1Text: "Years of experience organizing over 500 successful events.",
          card2Title: "Professional Team",
          card2Text: "A team of experts specialized in all aspects of event management.",
          card3Title: "High Quality",
          card3Text: "Commitment to the highest standards of quality and creativity in every project.",
          tagline: "Learn More About Us",
          learnMore: "Learn More",
          cta: "Start Your Journey With Us",
        },
        services: {
          title: "Our Services",
          description: "We provide a full suite of services to deliver outstanding events.",
          service1Title: "Event Planning & Execution",
          service1Text: "From concept to completion with meticulous attention.",
          service1Image: "",
          service2Title: "Exhibition Booth Design",
          service2Text: "Creative booth concepts executed to the highest quality.",
          service2Image: "",
          service3Title: "Attendance & Registration Management",
          service3Text: "Comprehensive solutions for attendee management.",
          service3Image: "",
          service4Title: "Workshop Organization",
          service4Text: "Coordinating and managing workshops efficiently.",
          service4Image: "",
          service5Title: "Photography & Media Coverage",
          service5Text: "Professional documentation and event photography.",
          service5Image: "",
          service6Title: "Venue Booking & Logistics",
          service6Text: "Securing venues and all supporting services.",
          service6Image: "",
          service7Title: "Gift Presentations",
          service7Text: "Specialized service for preparing and delivering unique gifts.",
          service7Image: "",
          service8Title: "Perfumes, Oud & Cosmetics",
          service8Text: "Providing the finest perfumes, oud, and beauty products.",
          service8Image: "",
          service9Title: "Entertainment Events",
          service9Text: "Organizing various entertainment festivals and activities.",
          service9Image: "",
          storeNote: "Now available as an online store",
          storeBrowse: "Browse our Jazal Store",
          button: "Learn More",
          tagline: "Our Premium Services",
          mostPopular: "Most Popular",
          service1Features: ["Advanced architectural design", "Comprehensive engineering supervision", "Quality assurance"],
          service2Features: ["Specialized consulting", "Expert team", "Innovative solutions"],
          service3Features: ["Project management", "Professional execution", "Continuous follow-up"],
          ctaTitle: "Ready to start your project?",
          ctaDescription: "Get a free consultation and discover how we can transform your vision into reality.",
          ctaButton: "Book Your Free Consultation",
        },
        projects: {
          title: "Our Past Projects",
          description: "We are proud to present our best works that have achieved remarkable success.",
          featuredTag: "Our Featured Work",
          categoryTrade: "Trade Exhibitions",
          categoryConference: "Scientific Conferences",
          categoryCeremony: "Award Ceremonies",
          project1Title: "Riyadh Commercial Expo",
          project1Text: "A specialized trade fair that attracted over 50,000 visitors.",
          project1Image: "",
          project2Title: "Technology & Innovation Conference",
          project2Text: "An international conference that gathered experts from 20 countries.",
          project2Image: "",
          project3Title: "Annual Excellence Gala",
          project3Text: "A tribute event honoring the most influential personalities.",
          project3Image: "",
          project4Title: "Al-Burr Festival",
          project4Text: "An annual event highlighting the importance of wheat farming.",
          project4Image: "",
          exploreAll: "Explore All Our Works",
          details: "View Details",
        },
        clients: {
          title: "Our Clients",
          description: "We are proud of the trust of our distinguished clients from various sectors.",
          client1: "Mobily",
          client2: "Ministry of Agriculture",
          client3: "Ministry of Education",
          client4: "Ministry of Defense",
          client5: "Ministry of Interior",
          client6: "Nissan",
          tagline: "Our Partners in Success",
          statSatisfied: "Satisfied Clients",
          statProjects: "Projects Completed",
          statYears: "Years of Experience",
          statSatisfaction: "Satisfaction Rate",
          projectsWord: "projects",
          trustedPartner: "Trusted Partner",
          trustedByLeadersTitle: "Trusted by Industry Leaders",
          trustedByLeadersDesc: "We are proud that major companies and government entities trust our services. We deliver comprehensive solutions that meet the highest standards of quality and professionalism.",
          trustCert3: "On-Time Delivery",
          categoryEnergy: "Energy",
          categoryBanks: "Banks",
          categoryIndustry: "Industry",
          categoryGovernment: "Government",
        },
        testimonials: {
          title: "What Our Clients Say",
          description: "Opinions from clients we are proud to serve, whose testimonials drive us towards more creativity.",
          tagline: "Testimonials We Cherish",
          testimonial1Quote: "Working with the Jazal team was an exceptional experience. Their professionalism and precision in execution exceeded all our expectations. Highly recommended.",
          testimonial1Name: "Khalid Alameri",
          testimonial1Title: "CEO, Innovative Technology Co.",
          testimonial2Quote: "They organized our annual conference with outstanding success. Every detail was carefully considered, from registration to media coverage.",
          testimonial2Name: "Fatima Alhassan",
          testimonial2Title: "Head of Organizing Committee, Modern Medicine Conference",
          testimonial3Quote: "The designs they provided for our exhibition booth were creative and attracted a large number of visitors. Thank you, Jazal team.",
          testimonial3Name: "Sultan Almohammed",
          testimonial3Title: "Marketing Director, Inmaa Real Estate",
          testimonial4Quote: "Their flexibility and quick response to our requirements were what distinguished them the most. A cooperative and highly professional team.",
          testimonial4Name: "Noura Alsalem",
          testimonial4Title: "Founder, Ebda'a Platform",
        },
        faq: {
          title: "Frequently Asked Questions",
          description: "Here are answers to some questions you might have. If you can't find your answer, don't hesitate to contact us directly.",
          tagline: "HAVE A QUESTION?",
          q1: "How long does it take to prepare for an event?",
          a1: "From one to six months depending on the event size",
          q2: "Do you provide service in all regions of the Kingdom?",
          a2: "Yes, we are proud to offer our services throughout the Kingdom of Saudi Arabia. Our team has the logistical capacity and experience to execute successful events in any city.",
          q3: "Is it possible to design a special booth?",
          a3: "Absolutely. Designing custom and innovative booths is one of our core services. Our design team works with you to create a unique booth that reflects your brand identity and attracts visitors.",
          q4: "How is the pricing done?",
          a4: "Pricing is determined based on the requirements of each project, including the event's scale, requested services, and technical specifications. We provide a detailed and transparent quote after fully understanding your needs.",
        },
        contact: {
          title: "Contact Us",
          description: "We are here to turn your ideas into exceptional events.",
          phone: "WhatsApp Number",
          email: "Email",
          address: "Address",
          addressValue: "8133 Al-Qadeeh - Al Nada District, Riyadh RADA8133, Saudi Arabia",
          methodsTitle: "Contact Methods",
          whatsapp: "WhatsApp",
          whatsappDescription: "Fast direct communication",
          chatButton: "Chat",
          phoneSub: "For urgent inquiries",
          addressSub: "Head Office",
          formTitle: "Send Your Message",
          formSubtitle: "Your message will be sent directly via WhatsApp",
          sending: "Sending...",
          whatsappSubmit: "Send",
          formName: "Name",
          formNamePlaceholder: "Your full name",
          formPhonePlaceholder: "+966 5X XXX XXXX",
          formEmail: "Email",
          formMessage: "Message",
          formMessagePlaceholder: "Write your message here...",
          formButton: "Send Message",
        },
        footer: {
          description: "A leading Saudi company in organizing exhibitions, conferences, and events. We strive to deliver exceptional experiences that exceed expectations.",
          links: "Quick Links",
          follow: "Follow Us",
          rights: "All rights reserved to Jazal © 2025 <a href=\"https://roqi.sa/\" target=\"_blank\" rel=\"noopener noreferrer\">ROQI</a> Design & Development",
          companyTitle: "Our Company",
          companyDescription: "We offer comprehensive exhibition, conference, and event management services with over 15 years of experience.",
          servicesTitle: "Services",
          service1Title: "Exhibition Organization",
          service1Desc: "Integrated management of trade and specialty exhibitions",
          service2Title: "Conference Organization",
          service2Desc: "Comprehensive coordination for conferences and seminars",
          service3Title: "Event Management",
          service3Desc: "Professional execution of all types of events",
          contactTitle: "Contact Us",
          contactAddress: "8133 Al-Qadeeh - Al Nada District, Riyadh RADA8133, Saudi Arabia",
          contactPhone: "+966504447148",
          contactEmail: "Jzl.co@hotmail.com",
          contactHours: "Sun - Thu: 8:00 - 17:00",
        },
        toast: {
          successTitle: "Your message has been sent successfully!",
          successDescription: "We will get back to you as soon as possible.",
          featureTitle: "🚧 This feature isn't implemented yet",
          featureDescription: "But don't worry! You can request it in your next prompt! 🚀",
        }
      }
    };
  }
}

export default new FirebaseService(); 