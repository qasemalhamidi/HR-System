
import {
  ApplicationConfig,
  inject,
  provideAppInitializer
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { LanguageService } from './core/services/language';

export const appConfig: ApplicationConfig = {
  providers: [

    provideRouter(routes),

    provideHttpClient(),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
        failOnError: true
      }),
      lang: 'ar',
      fallbackLang: 'ar'
    }),

    provideAppInitializer(() => {
        const languageService = inject(LanguageService);
        return languageService.initialize();
})

  ]
};
