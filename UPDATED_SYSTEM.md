# تحديثات النظام الجديدة

## التغييرات الرئيسية

### 1. استخدام الاستضافة المحلية للصور
- **قبل**: استخدام Firebase Storage لرفع الصور
- **الآن**: استخدام الاستضافة المحلية (مجلد `public/uploads/`)
- **المميزات**:
  - تحكم كامل في الملفات
  - سرعة أعلى في التحميل
  - تكلفة أقل
  - سهولة النسخ الاحتياطي

### 2. نظام دمج البيانات المحسن
- **قبل**: استبدال البيانات بالكامل
- **الآن**: دمج البيانات الجديدة مع الموجودة
- **المميزات**:
  - الحفاظ على البيانات الموجودة
  - تحديث جزئي للبيانات
  - تقليل مخاطر فقدان البيانات
  - مرونة أكبر في التحديثات

## الملفات المحدثة

### 1. `src/lib/firebaseService.js`
```javascript
// دمج البيانات الجديدة مع الموجودة
mergeData(existingData, newData) {
  const merged = { ...existingData };
  
  // دمج البيانات العربية
  if (newData.ar) {
    merged.ar = this.mergeNestedObject(merged.ar || {}, newData.ar);
  }
  
  // دمج البيانات الإنجليزية
  if (newData.en) {
    merged.en = this.mergeNestedObject(merged.en || {}, newData.en);
  }
  
  return merged;
}
```

### 2. `src/lib/firebase.js`
- إزالة Firebase Storage
- الاحتفاظ بـ Firestore Database فقط

### 3. `src/admin/Dashboard.jsx`
- تحديث نظام حفظ البيانات
- تحسين رفع الصور
- إضافة التحقق من الملفات

## كيفية عمل النظام الجديد

### 1. رفع الصور
```javascript
// إنشاء اسم فريد للملف
const timestamp = Date.now();
const fileName = `${timestamp}_${file.name}`;
const filePath = `/uploads/${path}/${fileName}`;

// URL للصورة في الاستضافة المحلية
const imageUrl = `${window.location.origin}${filePath}`;
```

### 2. دمج البيانات
```javascript
// الحصول على البيانات الموجودة
const existingData = await getWebsiteData();

// دمج البيانات الجديدة
const mergedData = mergeData(existingData, newData);

// حفظ البيانات المدمجة
await saveWebsiteData(mergedData);
```

## هيكل البيانات الجديد

### في قاعدة البيانات
```javascript
{
  ar: {
    services: {
      service1Title: "عنوان الخدمة",
      service1Text: "وصف الخدمة",
      service1Image: "/uploads/website-images/1234567890_image.jpg"
    },
    projects: {
      project1Title: "عنوان المشروع",
      project1Text: "وصف المشروع",
      project1Image: "/uploads/website-images/1234567890_project.jpg"
    }
  },
  en: {
    // نفس الهيكل للغة الإنجليزية
  }
}
```

### في الاستضافة المحلية
```
public/
  uploads/
    website-images/
      1234567890_image.jpg
      1234567890_project.jpg
    services/
      1234567890_service.jpg
    projects/
      1234567890_project.jpg
```

## المميزات الجديدة

### 1. التحقق من الملفات
- التحقق من نوع الملف (صور فقط)
- التحقق من حجم الملف (حد أقصى 5 ميجابايت)
- رسائل خطأ واضحة

### 2. نظام دمج ذكي
- دمج الكائنات المتداخلة
- الحفاظ على البيانات الموجودة
- تحديث جزئي للبيانات

### 3. إدارة أفضل للملفات
- أسماء فريدة للملفات
- تنظيم في مجلدات
- سهولة الوصول

## الخطوات التالية

### 1. إعداد الاستضافة
```bash
# إنشاء مجلد الصور
mkdir -p public/uploads/website-images
mkdir -p public/uploads/services
mkdir -p public/uploads/projects
```

### 2. تكوين الخادم
```javascript
// في server.js أو ملف الخادم
app.use('/uploads', express.static('public/uploads'));
```

### 3. النسخ الاحتياطي
```bash
# نسخ احتياطي للصور
cp -r public/uploads/ backup/uploads/

# نسخ احتياطي للبيانات
# يتم تلقائياً في Firebase
```

## استكشاف الأخطاء

### مشكلة: الصور لا تظهر
**الحل:**
1. تأكد من وجود مجلد `public/uploads/`
2. تحقق من صلاحيات الملفات
3. تأكد من تكوين الخادم

### مشكلة: البيانات لا تحفظ
**الحل:**
1. تحقق من قواعد Firebase
2. تأكد من اتصال الإنترنت
3. راجع وحدة تحكم المتصفح

### مشكلة: خطأ في رفع الملفات
**الحل:**
1. تحقق من نوع الملف (صور فقط)
2. تأكد من حجم الملف (أقل من 5 ميجابايت)
3. تحقق من صلاحيات المجلد

## ملاحظات مهمة

1. **الأمان**: تأكد من تكوين قواعد الأمان المناسبة
2. **الأداء**: اضغط الصور قبل الرفع لتحسين الأداء
3. **النسخ الاحتياطي**: احتفظ بنسخ احتياطية منتظمة
4. **المراقبة**: راقب استخدام المساحة والتخزين

## الدعم

إذا واجهت أي مشاكل:
1. راجع وحدة تحكم المتصفح للأخطاء
2. تحقق من ملفات السجل
3. تأكد من تكوين Firebase
4. راجع إعدادات الخادم 