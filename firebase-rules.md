# قواعد الأمان Firebase

## Firestore Database Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // قاعدة البيانات الرئيسية للموقع
    match /website/{document} {
      allow read: if true; // السماح بالقراءة للجميع
      allow write: if request.auth != null; // السماح بالكتابة للمستخدمين المسجلين فقط
    }
    
    // قواعد إضافية للأمان
    match /{document=**} {
      allow read, write: if false; // منع الوصول لجميع المستندات الأخرى
    }
  }
}
```

## Firebase Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // السماح برفع الصور للمستخدمين المسجلين
    match /images/{allPaths=**} {
      allow read: if true; // السماح بالقراءة للجميع
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024 // أقل من 5 ميجابايت
                   && request.resource.contentType.matches('image/.*'); // صور فقط
    }
    
    // منع الوصول لجميع الملفات الأخرى
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## كيفية تطبيق القواعد

### 1. Firestore Database
1. اذهب إلى Firebase Console
2. اختر مشروعك
3. اذهب إلى Firestore Database
4. انقر على "Rules"
5. انسخ والصق قواعد Firestore أعلاه
6. انقر "Publish"

### 2. Firebase Storage
1. اذهب إلى Firebase Console
2. اختر مشروعك
3. اذهب إلى Storage
4. انقر على "Rules"
5. انسخ والصق قواعد Storage أعلاه
6. انقر "Publish"

## ملاحظات الأمان

### ✅ الميزات المضمنة
- قراءة البيانات متاحة للجميع (لعرض الموقع)
- الكتابة محمية بالمصادقة
- حجم الملفات محدود
- أنواع الملفات مقيدة

### ⚠️ تحذيرات مهمة
- تأكد من تفعيل Authentication في Firebase
- استخدم قواعد أكثر صرامة للإنتاج
- راقب استخدام Firebase بانتظام
- احتفظ بنسخ احتياطية من البيانات

### 🔧 تخصيص القواعد
يمكنك تعديل القواعد حسب احتياجاتك:

```javascript
// مثال: السماح بالكتابة لجميع المستخدمين (للتطوير فقط)
allow write: if true;

// مثال: تقييد الوصول لـ IP معين
allow write: if request.auth != null 
             && request.auth.token.email == "admin@example.com";

// مثال: تقييد حجم الملفات أكثر
allow write: if request.auth != null 
             && request.resource.size < 2 * 1024 * 1024; // 2 ميجابايت فقط
```

## اختبار القواعد

### اختبار القراءة
```javascript
// يجب أن يعمل
db.collection('website').doc('data').get()

// يجب أن يفشل
db.collection('private').doc('secret').get()
```

### اختبار الكتابة
```javascript
// يجب أن يعمل للمستخدمين المسجلين
db.collection('website').doc('data').set(data)

// يجب أن يفشل للمستخدمين غير المسجلين
db.collection('website').doc('data').set(data)
```

### اختبار رفع الصور
```javascript
// يجب أن يعمل للمستخدمين المسجلين
storage.ref('images/website-images/test.jpg').put(file)

// يجب أن يفشل للملفات الكبيرة
storage.ref('images/website-images/large.jpg').put(largeFile)

// يجب أن يفشل للملفات غير الصور
storage.ref('images/website-images/document.pdf').put(pdfFile)
``` 