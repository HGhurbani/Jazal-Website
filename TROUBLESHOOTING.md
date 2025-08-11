# حل المشاكل الشائعة

## المشكلة 1: تحذير Toast

### الخطأ:
```
Warning: Invalid value for prop `dismiss` on <li> tag
```

### الحل:
تم إصلاح المشكلة في ملف `src/components/ui/toaster.jsx` بإزالة خاصية `dismiss` من props.

## المشكلة 2: خطأ في حفظ البيانات

### الأسباب المحتملة:
1. **مشكلة في قواعد Firebase**: لم يتم تطبيق قواعد الأمان
2. **مشكلة في الاتصال**: انقطاع في الإنترنت
3. **مشكلة في البيانات**: بيانات غير صحيحة

### الحلول:

#### 1. تطبيق قواعد Firebase
```javascript
// قواعد Firestore Database
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /website/{document} {
      allow read: if true;
      allow write: if true; // مؤقتاً للاختبار
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### 2. التحقق من الاتصال
```javascript
// في وحدة تحكم المتصفح
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './src/lib/firebase';

const db = getFirestore(app);
const docRef = doc(db, 'website', 'data');
const docSnap = await getDoc(docRef);
console.log(docSnap.exists() ? "✅ متصل" : "❌ غير متصل");
```

#### 3. التحقق من البيانات
```javascript
// في Dashboard.jsx
const handleSave = async () => {
  try {
    console.log('البيانات المراد حفظها:', updatedData);
    await firebaseService.saveWebsiteData(updatedData);
    console.log('تم الحفظ بنجاح');
  } catch (error) {
    console.error('تفاصيل الخطأ:', error);
  }
};
```

## المشكلة 3: الصور لا تظهر

### الحل:
1. تأكد من وجود مجلد `public/uploads/`
2. تحقق من صلاحيات الملفات
3. تأكد من تكوين الخادم

```bash
# إنشاء المجلدات المطلوبة
mkdir -p public/uploads/website-images
mkdir -p public/uploads/services
mkdir -p public/uploads/projects
```

## المشكلة 4: خطأ في رفع الملفات

### الحل:
1. تحقق من نوع الملف (صور فقط)
2. تأكد من حجم الملف (أقل من 5 ميجابايت)
3. تحقق من صلاحيات المجلد

```javascript
// التحقق من نوع الملف
if (!file.type.startsWith('image/')) {
  console.error('نوع ملف غير صحيح');
  return;
}

// التحقق من حجم الملف
if (file.size > 5 * 1024 * 1024) {
  console.error('حجم ملف كبير جداً');
  return;
}
```

## المشكلة 5: البيانات لا تحفظ

### الحلول:

#### 1. التحقق من Firebase Console
- اذهب إلى [Firebase Console](https://console.firebase.google.com/)
- اختر مشروعك
- اذهب إلى Firestore Database
- تحقق من وجود البيانات

#### 2. التحقق من القواعد
```javascript
// قواعد مؤقتة للاختبار
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /website/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

#### 3. التحقق من الكود
```javascript
// في firebaseService.js
async saveWebsiteData(newData) {
  try {
    console.log('حفظ البيانات:', newData);
    const docRef = doc(db, 'website', 'data');
    await setDoc(docRef, newData, { merge: true });
    console.log('تم الحفظ بنجاح');
    return true;
  } catch (error) {
    console.error('خطأ في الحفظ:', error);
    throw error;
  }
}
```

## المشكلة 6: خطأ في تحميل البيانات

### الحل:
```javascript
// في LanguageContext.jsx
const loadTranslations = async () => {
  try {
    console.log('جاري تحميل البيانات...');
    const data = await firebaseService.getWebsiteData();
    console.log('تم تحميل البيانات:', data);
    return data;
  } catch (error) {
    console.error('خطأ في التحميل:', error);
    return defaultTranslations;
  }
};
```

## خطوات التشخيص

### 1. فتح وحدة تحكم المتصفح
- اضغط F12
- اذهب إلى تبويب Console
- ابحث عن الأخطاء

### 2. التحقق من الشبكة
- اذهب إلى تبويب Network
- تحقق من طلبات Firebase
- ابحث عن أخطاء 403 أو 404

### 3. اختبار الاتصال
```javascript
// في وحدة تحكم المتصفح
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './src/lib/firebase';

const db = getFirestore(app);
const docRef = doc(db, 'website', 'data');
const docSnap = await getDoc(docRef);
console.log('نتيجة الاختبار:', docSnap.exists());
```

## نصائح عامة

1. **تأكد من تطبيق قواعد Firebase**
2. **تحقق من اتصال الإنترنت**
3. **راجع وحدة تحكم المتصفح للأخطاء**
4. **اختبر الاتصال بـ Firebase**
5. **تحقق من صحة البيانات**

## الدعم

إذا استمرت المشكلة:
1. راجع [وثائق Firebase](https://firebase.google.com/docs)
2. تحقق من [Firebase Status](https://status.firebase.google.com/)
3. راجع وحدة تحكم المتصفح للأخطاء
4. تأكد من تكوين المشروع بشكل صحيح 