import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RoleService, UserRole } from '../../core/services/role';
import { LayoutService } from '../../core/services/layout';

interface SidebarItem {
  icon: string;
  labelKey: string;
  route: string;
  roles: UserRole[];
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  private roleService = inject(RoleService);
  private layout = inject(LayoutService);

  sidebarOpen = this.layout.sidebarOpen;

  private menuItems: SidebarItem[] = [
    { icon: 'bi-speedometer2',   labelKey: 'SIDEBAR.DASHBOARD',   route: '/dashboard',   roles: ['HR', 'Employee'], exact: true },
    { icon: 'bi-people',         labelKey: 'SIDEBAR.EMPLOYEES',   route: '/employees',   roles: ['HR'] },
    { icon: 'bi-building',       labelKey: 'SIDEBAR.DEPARTMENTS', route: '/departments', roles: ['HR'] },
    { icon: 'bi-person-circle',  labelKey: 'SIDEBAR.MY_PROFILE',  route: '/my-profile',  roles: ['Employee'] },
    { icon: 'bi-calendar-check', labelKey: 'SIDEBAR.ATTENDANCE',  route: '/attendance',  roles: ['HR', 'Employee'] },
    { icon: 'bi-calendar-event', labelKey: 'SIDEBAR.LEAVES',      route: '/leaves',      roles: ['HR', 'Employee'] },
    { icon: 'bi-cash',           labelKey: 'SIDEBAR.PAYROLL',     route: '/payroll',     roles: ['HR'] },
    { icon: 'bi-receipt',        labelKey: 'SIDEBAR.MY_PAYSLIP',  route: '/my-payslip',  roles: ['Employee'] }
  ];

  visibleItems = computed(() =>
    this.menuItems.filter(item =>
      item.roles.includes(this.roleService.currentRole())
    )
  );

  closeSidebar(): void {
    this.layout.closeSidebar();
  }
}