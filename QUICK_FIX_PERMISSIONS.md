# حل سريع لمشكلة أذونات Firebase

## المشكلة الحالية
```
FirebaseError: Missing or insufficient permissions
```

## الحل السريع (5 دقائق)

### الخطوة 1: تفعيل Firestore Database
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك `book-3d7c1`
3. في القائمة الجانبية، انقر على **"Firestore Database"**
4. إذا لم تكن مفعلة، انقر على **"Create database"**
5. اختر **"Start in test mode"** (للاختبار السريع)
6. اختر موقع قاعدة البيانات
7. انقر **"Done"**

### الخطوة 2: تفعيل Firebase Storage
1. في Firebase Console، انقر على **"Storage"**
2. انقر على **"Get started"**
3. اختر **"Start in test mode"**
4. اختر نفس موقع قاعدة البيانات
5. انقر **"Done"**

### الخطوة 3: تطبيق قواعد الأمان (مهم جداً)

#### قواعد Firestore Database:
1. اذهب إلى **Firestore Database**
2. انقر على **"Rules"**
3. احذف المحتوى الحالي واستبدله بـ:

```javascript
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

4. انقر **"Publish"**

#### قواعد Storage:
1. اذهب إلى **Storage**
2. انقر على **"Rules"**
3. احذف المحتوى الحالي واستبدله بـ:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if true; // مؤقتاً للاختبار
    }
    
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

4. انقر **"Publish"**

### الخطوة 4: اختبار الحل
1. أعد تشغيل التطبيق: `npm run dev`
2. اذهب إلى لوحة التحكم
3. تحقق من عدم ظهور أخطاء الأذونات

## قواعد الأمان النهائية (بعد التأكد من عمل النظام)

بعد التأكد من أن النظام يعمل، استبدل القواعد بـ:

### Firestore Database Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /website/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
    
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## استكشاف الأخطاء

### إذا استمرت المشكلة:
1. تأكد من أن مشروع Firebase صحيح
2. تحقق من إعدادات Firebase في `src/lib/firebase.js`
3. انتظر 2-3 دقائق بعد تطبيق القواعد
4. امسح ذاكرة التخزين المؤقت للمتصفح

### للتحقق من الإعداد:
افتح وحدة تحكم المتصفح واكتب:
```javascript
// اختبار Firestore
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from './src/lib/firebase';
const db = getFirestore(app);
const docRef = doc(db, 'website', 'data');
const docSnap = await getDoc(docRef);
console.log(docSnap.exists() ? "✅ Firestore يعمل" : "⚠️ لا توجد بيانات");
```

## ملاحظات مهمة
- القواعد المؤقتة تسمح بالكتابة للجميع (للاختبار فقط)
- استبدل القواعد النهائية بعد التأكد من عمل النظام
- قواعد الاختبار غير آمنة للإنتاج 