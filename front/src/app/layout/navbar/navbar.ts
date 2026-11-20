import { Component, inject } from '@angular/core';

import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private languageService = inject(LanguageService);

  changeLanguage(language: 'ar' | 'en'): void {

    this.languageService.setLanguage(language);

  }

}