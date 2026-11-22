
import { Service, inject, signal } from '@angular/core';
import {  DOCUMENT,  isPlatformBrowser} from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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

  // Reactive language state
  readonly currentLanguage = signal<Language>('ar');

  // Initialize application language
  async initialize(): Promise<void> {

    const savedLanguage = this.isBrowser
      ? localStorage.getItem(this.storageKey)
      : null;

    const language: Language =
      savedLanguage === 'en' ? 'en' : 'ar';

    await this.setLanguage(language);
  }

  // Change application language
  async setLanguage(language: Language): Promise<void> {

    // Load translations and wait until loading finishes
    await firstValueFrom(
      this.translate.use(language)
    );

    // Update reactive state
    this.currentLanguage.set(language);

    // Update HTML attributes
    this.document.documentElement.lang = language;

    this.document.documentElement.dir =
      language === 'ar' ? 'rtl' : 'ltr';

    // Update Bootstrap stylesheet
    this.changeBootstrapStyle(language);

    // Save selected language
    if (this.isBrowser) {
      localStorage.setItem(
        this.storageKey,
        language
      );
    }
  }

  // Switch Bootstrap LTR / RTL
  private changeBootstrapStyle(language: Language): void {

    const link = this.document.getElementById(
      'bootstrap-theme'
    ) as HTMLLinkElement | null;

    if (!link) {
      console.error('Bootstrap theme link was not found');
      return;
    }

    link.href = language === 'ar'
      ? '/bootstrap-rtl.css'
      : '/bootstrap-ltr.css';
  }

}
