import { TemplateRef } from '@angular/core';

export interface TableColumn {
  key: string;
  headerKey: string;
  cellTemplate?: TemplateRef<{ $implicit: any }>;
}