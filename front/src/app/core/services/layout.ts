import { Service, signal } from '@angular/core';

@Service()
export class LayoutService {
  private open = signal(false);
  readonly sidebarOpen = this.open.asReadonly();

  toggleSidebar(): void {
    this.open.update(value => !value);
  }

  closeSidebar(): void {
    this.open.set(false);
  }
}