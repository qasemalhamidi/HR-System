
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RoleService, UserRole } from '../../core/services/role';

interface SidebarItem {
  icon: string;
  labelKey: string;
  route: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  private roleService = inject(RoleService);

  currentRole = this.roleService.currentRole;

  menuItems: SidebarItem[] = [
    {
      icon: 'bi-speedometer2',
      labelKey: 'SIDEBAR.DASHBOARD',
      route: '/dashboard',
      roles: ['HR', 'Employee']
    },
    {
      icon: 'bi-people',
      labelKey: 'SIDEBAR.EMPLOYEES',
      route: '/employees',
      roles: ['HR']
    },
    {
      icon: 'bi-building',
      labelKey: 'SIDEBAR.DEPARTMENTS',
      route: '/departments',
      roles: ['HR']
    },
    {
      icon: 'bi-calendar-check',
      labelKey: 'SIDEBAR.ATTENDANCE',
      route: '/attendance',
      roles: ['HR', 'Employee']
    },
    {
      icon: 'bi-calendar-event',
      labelKey: 'SIDEBAR.LEAVES',
      route: '/leaves',
      roles: ['HR', 'Employee']
    },
    {
      icon: 'bi-cash',
      labelKey: 'SIDEBAR.PAYROLL',
      route: '/payroll',
      roles: ['HR']
    }
  ];

  get visibleItems(): SidebarItem[] {
    return this.menuItems.filter(item =>
      item.roles.includes(this.currentRole())
    );
  }
}
