# تفعيل خدمات Firebase

## الخطوات المطلوبة

### 1. تفعيل Firestore Database

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك `book-3d7c1`
3. في القائمة الجانبية، انقر على "Firestore Database"
4. انقر على "Create database"
5. اختر "Start in test mode" (يمكنك تغيير القواعد لاحقاً)
6. اختر موقع قاعدة البيانات (يفضل `us-central1` أو `europe-west1`)
7. انقر "Done"

### 2. تفعيل Firebase Storage

1. في Firebase Console، انقر على "Storage"
2. انقر على "Get started"
3. اختر "Start in test mode"
4. اختر موقع Storage (نفس موقع قاعدة البيانات)
5. انقر "Done"

### 3. تفعيل Authentication (اختياري للأمان)

1. في Firebase Console، انقر على "Authentication"
2. انقر على "Get started"
3. في تبويب "Sign-in method"، فعّل الطرق المطلوبة:
   - Email/Password
   - Google (اختياري)
4. انقر "Save"

### 4. إعداد قواعد الأمان

#### قواعد Firestore Database
1. اذهب إلى Firestore Database
2. انقر على "Rules"
3. انسخ والصق القواعد من ملف `firebase-rules.md`
4. انقر "Publish"

#### قواعد Storage
1. اذهب إلى Storage
2. انقر على "Rules"
3. انسخ والصق القواعد من ملف `firebase-rules.md`
4. انقر "Publish"

## التحقق من الإعداد

### 1. اختبار قاعدة البيانات
```javascript
// في وحدة تحكم المتصفح
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './src/lib/firebase';

const db = getFirestore(app);
const docRef = doc(db, 'website', 'data');
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("✅ قاعدة البيانات تعمل بشكل صحيح");
  console.log(docSnap.data());
} else {
  console.log("⚠️ لا توجد بيانات، سيتم إنشاؤها تلقائياً");
}
```

### 2. اختبار Storage
```javascript
// في وحدة تحكم المتصفح
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from './src/lib/firebase';

const storage = getStorage(app);
const testRef = ref(storage, 'images/test/test.txt');

// اختبار رفع ملف
const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
try {
  await uploadBytes(testRef, testFile);
  console.log("✅ Storage يعمل بشكل صحيح");
} catch (error) {
  console.error("❌ خطأ في Storage:", error);
}
```

## استكشاف الأخطاء

### مشكلة: "Firestore is not enabled"
**الحل:**
1. تأكد من تفعيل Firestore Database
2. انتظر بضع دقائق بعد التفعيل
3. أعد تشغيل التطبيق

### مشكلة: "Storage is not enabled"
**الحل:**
1. تأكد من تفعيل Firebase Storage
2. تأكد من تطبيق قواعد Storage
3. انتظر بضع دقائق بعد التفعيل

### مشكلة: "Permission denied"
**الحل:**
1. تأكد من تطبيق قواعد الأمان الصحيحة
2. تحقق من أن المستخدم مسجل دخول (إذا كان مطلوباً)
3. تأكد من أن القواعد تسمح بالقراءة للجميع

### مشكلة: "File too large"
**الحل:**
1. تأكد من أن حجم الملف أقل من 5 ميجابايت
2. اضغط الصورة قبل الرفع
3. استخدم تنسيق صورة مضغوط

## مراقبة الاستخدام

### 1. مراقبة قاعدة البيانات
1. اذهب إلى Firestore Database
2. انقر على "Usage" في الأعلى
3. راقب عدد القراءات والكتابات

### 2. مراقبة Storage
1. اذهب إلى Storage
2. انقر على "Usage" في الأعلى
3. راقب مساحة التخزين المستخدمة

### 3. مراقبة التطبيق
1. اذهب إلى "Analytics" (إذا كان مفعلاً)
2. راقب استخدام التطبيق
3. تحقق من الأخطاء في "Crashlytics"

## نصائح للأداء

### 1. تحسين قاعدة البيانات
- استخدم فهارس للاستعلامات المعقدة
- قلل عدد القراءات غير الضرورية
- استخدم التخزين المؤقت عند الإمكان

### 2. تحسين Storage
- اضغط الصور قبل الرفع
- استخدم تنسيقات صورة فعالة (WebP)
- احذف الملفات غير المستخدمة

### 3. تحسين التطبيق
- استخدم التحميل التدريجي للصور
- طبق التخزين المؤقت في المتصفح
- قلل حجم الملفات المرفوعة

## الدعم

إذا واجهت أي مشاكل:

1. راجع [وثائق Firebase](https://firebase.google.com/docs)
2. تحقق من [Firebase Status](https://status.firebase.google.com/)
3. استخدم [Firebase Support](https://firebase.google.com/support)
4. راجع وحدة تحكم المتصفح للأخطاء 