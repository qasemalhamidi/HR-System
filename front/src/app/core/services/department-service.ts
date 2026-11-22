import { Service } from '@angular/core';
import { Department } from '../models/department';
import { delay, Observable, of, throwError } from 'rxjs';

@Service()
export class DepartmentService {
  private dept: Department[] =[
  { id: 1, nameAr: 'تقنية المعلومات', nameEn: 'IT' },
  { id: 2, nameAr: 'الموارد البشرية', nameEn: 'HR' },
  { id: 3, nameAr: 'المالية', nameEn: 'Finance' },
  { id: 4, nameAr: 'المبيعات', nameEn: 'Sales' }
];;
 

getAll(): Observable<Department[]> {
  return of(this.dept.map(dept => ({ ...dept }))).pipe(
    delay(300)
  );
}

  getById(id: number): Observable<Department> {
    const department = this.dept.find((d) => d.id === id);
    if (!department) {
      return throwError(() => new Error('Department not found')).pipe(delay(300));
    }

    return of(department).pipe(delay(300));
  }

  create(dto: Omit<Department, 'id'>): Observable<Department> {
    const newId = Math.max(0, ...this.dept.map((d) => d.id)) + 1;
    const newDepartment: Department = {id: newId,...dto,};
    this.dept = [...this.dept, newDepartment];
    return of({ ...newDepartment }).pipe(delay(300));
  }


  update(id: number, dto: Partial<Omit<Department, 'id'>>): Observable<Department> {
    const index = this.dept.findIndex((d) => d.id === id);
    if (index === -1) {
      return throwError(() => new Error('Department not found')).pipe(delay(300));
    }
    const updatedDepartment: Department = {...this.dept[index],...dto,id,};
    this.dept = this.dept.map((d) => (d.id === id ? updatedDepartment : d));
    return of({ ...updatedDepartment }).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    const exists = this.dept.some((d) => d.id === id);
    if (!exists) {
      return throwError(() => new Error('Department not found')).pipe(delay(300));
    }

    this.dept = this.dept.filter((d) => d.id !== id);

    return of(undefined).pipe(delay(300));
  }
}
