import { Component, computed, inject, signal, TemplateRef, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { DataTable } from '../../shared/components/data-table/data-table';
import { TableColumn } from '../../shared/models/table-column';
import { Employee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee-service';
import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'app-employees',
  imports: [DataTable, TranslatePipe],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
  private employeeService = inject(EmployeeService);
  private languageService = inject(LanguageService);

  lang = this.languageService.currentLanguage;

  nameTpl = viewChild.required<TemplateRef<{ $implicit: any }>>('nameTpl');
  statusTpl = viewChild.required<TemplateRef<{ $implicit: any }>>('statusTpl');

  employees = signal<Employee[]>([]);
  loading = signal(false);
  total = signal(0);
  page = signal(1);
  readonly pageSize = 5;

  columns = computed<TableColumn[]>(() => [
    { key: 'empNumber', headerKey: 'EMPLOYEES.NUMBER' },
    { key: 'name', headerKey: 'EMPLOYEES.NAME', cellTemplate: this.nameTpl() },
    { key: 'email', headerKey: 'EMPLOYEES.EMAIL' },
    { key: 'status', headerKey: 'EMPLOYEES.STATUS', cellTemplate: this.statusTpl() },
  ]);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);

    this.employeeService
      .getAll({ page: this.page(), pageSize: this.pageSize })
      .subscribe({
        next: (result) => {
          this.employees.set(result.items);
          this.total.set(result.total);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.load();
  }
}