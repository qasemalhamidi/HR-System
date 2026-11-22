import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { LayoutService } from '../../core/services/layout';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Sidebar, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  private layout = inject(LayoutService);

  sidebarOpen = this.layout.sidebarOpen;

  closeSidebar(): void {
    this.layout.closeSidebar();
  }
}