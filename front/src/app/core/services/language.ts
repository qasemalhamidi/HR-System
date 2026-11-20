import { Service,inject } from '@angular/core';
import {  DOCUMENT,  isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
export type Language = 'ar' | 'en';

@Service()
export class LanguageService {

  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'app-language';
  private readonly isBrowser = isPlatformBrowser(
    this.platformId
  );

  // تهيئة اللغة عند تشغيل التطبيق
  initialize(): void {

    const savedLanguage = this.isBrowser
      ? localStorage.getItem(this.storageKey)
      : null;

    const language: Language =
      savedLanguage === 'en' ? 'en' : 'ar';

    this.setLanguage(language);

  }

  // تغيير اللغة
  setLanguage(language: Language): void {

    const isArabic = language === 'ar';

    // 1. تغيير اتجاه الصفحة
    this.document.documentElement.dir =
      isArabic ? 'rtl' : 'ltr';

    // 2. تغيير لغة الصفحة
    this.document.documentElement.lang = language;

    // 3. تغيير Bootstrap CSS
    this.changeBootstrapStyle(language);

    // 4. حفظ اللغة
    if (this.isBrowser) {
      localStorage.setItem(
        this.storageKey,
        language
      );
    }

    // 5. تغيير الترجمة
    this.translate.use(language).subscribe({
      error: (error) => {
        console.error('Translation loading failed:', error);
      }
    });

  }

  // تبديل ملف CSS
  private changeBootstrapStyle(language: Language): void {

    const link = this.document.getElementById(
      'bootstrap-theme'
    ) as HTMLLinkElement | null;

    if (!link) {
      return;
    }

    link.href = language === 'ar'
      ? 'bootstrap-rtl.css'
      : 'bootstrap-ltr.css';

  }

  // إرجاع اللغة الحالية
  getCurrentLanguage(): Language {

    return this.translate.currentLang() === 'en'
      ? 'en'
      : 'ar';

  }

}
