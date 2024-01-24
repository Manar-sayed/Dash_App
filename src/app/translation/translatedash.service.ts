import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslatedashService {
  private translations: any = {
    en: {
      'dashboard.title': 'Dashboard',
      'dashboard.product': 'Product',
      'dashboard.addproduct': 'Add Product',
      'dashboard.category': 'Category',
      'dashboard.addcategory': 'Add Category',
      'dashboard.relatedWork': 'Related Work',
      'dashboard.addrelatedWork': 'Add Related Work',
      'dashboard.contactMessage': 'Contact Message',
      'dashboard.setting': 'Setting',
      'dashboard.logout': 'LogOut',
      // product list page
      'product.maintitle': 'All Products',
      'product.createbtn': 'Create New Product',
      'product.id': 'ID',
      'product.name': 'Product Name',
      'product.actions': 'Actions',
      // product update page & create
      'productedit.maintitle': 'Edit Product',
      'productcreate.maintitle': 'Add Products',
      'productedit.name': 'Product Name(En)',
      'productedit.arabicname': 'Product Name(Ar)',
      'productedit.desc': 'Description (En)',
      'productedit.arabicdesc': 'Description(Ar)',
      'productedit.video': 'Video',
      'productedit.image': 'Image',
      'productedit.imagePreview': 'Image Preview',
      'productedit.uploadImage': 'Upload Image',
      'productedit.category': 'Category',
      //Related Work
      'productRelated.maintitle': 'All Related Work ',
      'productRelated.id': 'ID',
      'productRelated.name': 'Object Name',
      'productRelated.actions': 'Avtions',
      'productRelatedcreate.maintitle': 'Create Related Work',
      'productRelatededit.maintitle': 'Edit Related Work',
      'productRelatedcreate.name': 'Name(En)',
      'productRelatedcreate.arabicname': 'Name(AR)',
      'productRelatedcreate.desc': 'Description(En)',
      'productRelatedcreate.arabicdesc': 'Description(Ar)',
      'productRelatedcreate.image': 'Image',
      'productRelatedcreate.imagePreview': 'Image Preview',
      'productRelatedcreate.category': 'Product Related to',
      //Category
      'category.maintitle': 'All Category',
      'Categorycreate.maintitle': 'Create Category',
      'Categoryedit.maintitle': 'Edit Category ',
      'Category.name': 'Category Name(En)',
      'Categorytable.name': 'Category Name',
      'Category.arabicname': 'Category Name(Ar)',
      //messages
      'messages.maintitle': 'All Messages',
      'messagescreate.maintitle': 'Create New Message',
      'messages.clientName': 'Client Name',
      'messagestable.phone': 'Phone Number',
      'messages.messageText': 'Message Text',
      //validtion
      'create.required': 'Required',
      'create.length': 'must be at least 4 char(s)',
      // general
      'product.savebtn': 'Save',
      'product.backbtn': 'Go Back',
      'product.deletebtn': 'Delete',
      'product.closebtn': 'Close',
      'product.deleteMainTitle': 'Delete Current Object',
      'product.deleteDesc': 'Are you Sure?',
      formValid: ' Please Enter Valid data...',
    },
    ar: {
      'dashboard.title': 'الرئيسية',
      'dashboard.product': 'المنتجات',
      'dashboard.addproduct': 'إضافة منتج',
      'dashboard.category': 'الفئات',
      'dashboard.addcategory': ' إضافة فئة',
      'dashboard.relatedWork': 'الأعمال المشابهة',
      'dashboard.addrelatedWork': 'إضافة عمل مشابه',
      'dashboard.contactMessage': 'رسايل العملاء',
      'dashboard.setting': 'معلومات الموقع',
      'dashboard.logout': 'تسجيل الخروج',
      // product list page
      'product.maintitle': 'كل المنتجات',
      'product.createbtn': 'إنشاء منتج جديد',
      'product.id': 'الرقم التعريفى',
      'product.name': 'إسم المنتج',
      'product.actions': 'العمليات',
      // product update page & create
      'productedit.maintitle': 'تعديل المنتج',
      'productcreate.maintitle': 'إنشاء منتج',
      'productedit.name': 'إسم المنتج بالإنجليزية',
      'productedit.arabicname': 'إسم المنتج بالعربية',
      'productedit.desc': 'الوصف بالإنجليزية',
      'productedit.arabicdesc': 'الوصف بالعربية',
      'productedit.video': 'الفيديو',
      'productedit.image': 'الصورة',
      'productedit.imagePreview': 'عرض الصورة',
      'productedit.uploadImage': 'تحميل صورة',

      'productedit.category': 'الفئة',
      //Related Work
      'productRelated.maintitle': 'كل العناصر المشابهة',
      'productRelated.id': 'الرقم التعريفى',
      'productRelated.name': 'إسم العنصر',
      'productRelated.actions': 'العمليات',
      'productRelatedcreate.maintitle': 'إنشاء عنصر مشابه',
      'productRelatededit.maintitle': 'تعديل عنصر مشابه',
      'productRelatedcreate.name': 'إسم العنصر بالإنجليزية',
      'productRelatedcreate.arabicname': 'إسم العنصر بالعربية',
      'productRelatedcreate.desc': 'الوصف بالإنجليزية',
      'productRelatedcreate.arabicdesc': 'الوصف بالعربية',
      'productRelatedcreate.image': 'الصورة',
      'productRelatedcreate.imagePreview': 'عرض الصورة',
      'productRelatedcreate.category': 'العمل التابع له',

      //Category
      'category.maintitle': 'كل الفئات',
      'Categorycreate.maintitle': 'إنشاء فئة جديدة',
      'Categoryedit.maintitle': 'تعديل فئة ',
      'Category.name': 'إسم الفئة بالإنجليزية',
      'Categorytable.name': 'إسم الفئة ',
      'Category.arabicname': 'إسم الفئة بالعربية',
      //messages
      'messages.maintitle': 'كل الرسائل',
      'messagescreate.maintitle': 'إنشاء رسالة جديدة',
      'messages.clientName': 'إسم العميل',
      'messagestable.phone': 'رقم الهاتف',
      'messages.messageText': 'نص الرسالة',

      //validtion
      'create.required': 'مطلوب',
      'create.length': 'يجب أن يكون على الأقل 4 أحرف',
      // general
      'product.savebtn': 'حفظ',
      'product.backbtn': 'رجوع',
      'product.deletebtn': 'حذف',
      'product.closebtn': 'إغلاق',
      'product.deleteMainTitle': 'حذف العنصر الحالى',
      'product.deleteDesc': 'هل أنت متأكد أنك تريد حذف هذا العنصر؟',
      formValid: 'من فضلك أدخل بيانات صحيحة...',
    },
  };
  translate(key: string, language: string): string {
    return this.translations[language][key] || key;
  }

  private languageSubject = new BehaviorSubject<string>('ar');
  public language$ = this.languageSubject.asObservable();

  setLanguage(language: string): void {
    this.languageSubject.next(language);
  }

  getLanguage(): Observable<string> {
    return this.language$;
  }
  constructor() {}
}
