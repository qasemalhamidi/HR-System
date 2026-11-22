import { Service } from '@angular/core';
import { JobTitle } from '../models/job-title';
import { delay, Observable, of } from 'rxjs';

@Service()
export class JobTitleService {
    private jobTitles: JobTitle[] = [
    { id: 1, nameAr: 'مطور برمجيات', nameEn: 'Software Developer' },
    { id: 2, nameAr: 'مدير موارد بشرية', nameEn: 'HR Manager' },
    { id: 3, nameAr: 'محاسب', nameEn: 'Accountant' },
    { id: 4, nameAr: 'مسؤول مبيعات', nameEn: 'Sales Representative' },
    { id: 5, nameAr: 'مدير تقنية المعلومات', nameEn: 'IT Manager' }
  ];

  getAll(): Observable<JobTitle[]> {
    return of(this.jobTitles.map(job => ({ ...job }))).pipe(
      delay(300)
    );
  }
}
