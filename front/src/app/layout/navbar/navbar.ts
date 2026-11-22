
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService, Language } from '../../core/services/language';
import { RoleService } from '../../core/services/role';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private languageService = inject(LanguageService);
  private roleService = inject(RoleService);

  currentLanguage = this.languageService.currentLanguage;
  currentRole = this.roleService.currentRole;

  async changeLanguage(language: Language): Promise<void> {
    await this.languageService.setLanguage(language);
  }

  changeRole(): void {
    this.roleService.toggleRole();
  }
}
