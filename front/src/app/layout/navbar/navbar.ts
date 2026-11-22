import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService, Language } from '../../core/services/language';
import { RoleService } from '../../core/services/role';
import { LayoutService } from '../../core/services/layout';

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private languageService = inject(LanguageService);
  private roleService = inject(RoleService);
  private layout = inject(LayoutService);
  private router = inject(Router);

  currentLanguage = this.languageService.currentLanguage;
  currentRole = this.roleService.currentRole;

  async changeLanguage(language: Language): Promise<void> {
    await this.languageService.setLanguage(language);
  }

  changeRole(): void {
    this.roleService.toggleRole();
    this.router.navigateByUrl('/dashboard');
  }

  toggleSidebar(): void {
    this.layout.toggleSidebar();
  }
}