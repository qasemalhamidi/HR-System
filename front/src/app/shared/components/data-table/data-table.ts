import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, output, TemplateRef } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TableColumn } from '../../models/table-column';

@Component({
  selector: 'app-data-table',
  imports: [NgTemplateOutlet, TranslatePipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);
  loading = input(false);
  total = input(0);
  page = input(1);
  pageSize = input(10);
  actionsTemplate = input<TemplateRef<{ $implicit: any }> | undefined>(undefined);

  pageChange = output<number>();

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize()))
  );

  from = computed(() =>
    this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1
  );

  to = computed(() =>
    Math.min(this.page() * this.pageSize(), this.total())
  );

  colspan = computed(() =>
    this.columns().length + (this.actionsTemplate() ? 1 : 0)
  );

  pages = computed(() => {
    const start = Math.max(1, this.page() - 2);
    const end = Math.min(this.totalPages(), this.page() + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  });

  goTo(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.page()) {
      return;
    }
    this.pageChange.emit(page);
  }
}