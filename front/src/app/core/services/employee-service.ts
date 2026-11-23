import { Service } from '@angular/core';
import { Observable, of, delay, timer, mergeMap, throwError } from 'rxjs';
import { Employee, CreateEmployeeDto, UpdateEmployeeDto, EmployeeQuery } from '../models/employee';
import { PagedResult } from '../models/paged-result';

@Service()
export class EmployeeService {

  private employees: Employee[] = [
    { id: 1, empNumber: 'EMP-001', fNameAr: 'أحمد', lNameAr: 'محمد', fNameEn: 'Ahmad', lNameEn: 'Mohammad', email: 'ahmad.mohammad@company.com', phone: '0791111111', deptId: 1, jobTitleId: 1, hireDate: '2022-01-15', salary: 1200, status: 'Active' },
    { id: 2, empNumber: 'EMP-002', fNameAr: 'سارة', lNameAr: 'علي', fNameEn: 'Sara', lNameEn: 'Ali', email: 'sara.ali@company.com', phone: '0792222222', deptId: 2, jobTitleId: 2, hireDate: '2021-05-10', salary: 1500, status: 'Active' },
    { id: 3, empNumber: 'EMP-003', fNameAr: 'محمد', lNameAr: 'خالد', fNameEn: 'Mohammad', lNameEn: 'Khaled', email: 'mohammad.khaled@company.com', phone: '0793333333', deptId: 3, jobTitleId: 3, hireDate: '2023-03-20', salary: 1000, status: 'Active' },
    { id: 4, empNumber: 'EMP-004', fNameAr: 'ليلى', lNameAr: 'حسن', fNameEn: 'Layla', lNameEn: 'Hassan', email: 'layla.hassan@company.com', phone: '0794444444', deptId: 4, jobTitleId: 4, hireDate: '2022-08-01', salary: 1100, status: 'Inactive' },
    { id: 5, empNumber: 'EMP-005', fNameAr: 'عمر', lNameAr: 'إبراهيم', fNameEn: 'Omar', lNameEn: 'Ibrahim', email: 'omar.ibrahim@company.com', phone: '0795555555', deptId: 1, jobTitleId: 5, hireDate: '2020-11-12', salary: 1800, status: 'Active' },
    { id: 6, empNumber: 'EMP-006', fNameAr: 'نور', lNameAr: 'أحمد', fNameEn: 'Noor', lNameEn: 'Ahmad', email: 'noor.ahmad@company.com', phone: '0796666666', deptId: 2, jobTitleId: 2, hireDate: '2023-06-05', salary: 950, status: 'Active' },
    { id: 7, empNumber: 'EMP-007', fNameAr: 'خالد', lNameAr: 'يوسف', fNameEn: 'Khaled', lNameEn: 'Yousef', email: 'khaled.yousef@company.com', phone: '0797777777', deptId: 3, jobTitleId: 3, hireDate: '2021-09-18', salary: 1300, status: 'Inactive' },
    { id: 8, empNumber: 'EMP-008', fNameAr: 'مريم', lNameAr: 'سعيد', fNameEn: 'Mariam', lNameEn: 'Saeed', email: 'mariam.saeed@company.com', phone: '0798888888', deptId: 4, jobTitleId: 4, hireDate: '2024-02-11', salary: 1050, status: 'Active' },
    { id: 9, empNumber: 'EMP-009', fNameAr: 'يوسف', lNameAr: 'سمير', fNameEn: 'Yousef', lNameEn: 'Samir', email: 'yousef.samir@company.com', phone: '0799999999', deptId: 1, jobTitleId: 1, hireDate: '2022-12-01', salary: 1400, status: 'Active' },
    { id: 10, empNumber: 'EMP-010', fNameAr: 'ريم', lNameAr: 'محمود', fNameEn: 'Reem', lNameEn: 'Mahmoud', email: 'reem.mahmoud@company.com', phone: '0781111111', deptId: 2, jobTitleId: 2, hireDate: '2020-04-25', salary: 1600, status: 'Inactive' },
    { id: 11, empNumber: 'EMP-011', fNameAr: 'طارق', lNameAr: 'عبدالله', fNameEn: 'Tareq', lNameEn: 'Abdullah', email: 'tareq.abdullah@company.com', phone: '0782222222', deptId: 3, jobTitleId: 3, hireDate: '2023-01-09', salary: 1150, status: 'Active' },
    { id: 12, empNumber: 'EMP-012', fNameAr: 'دانا', lNameAr: 'فارس', fNameEn: 'Dana', lNameEn: 'Fares', email: 'dana.fares@company.com', phone: '0783333333', deptId: 4, jobTitleId: 4, hireDate: '2024-07-14', salary: 1250, status: 'Active' }
  ];

  // GET ALL
  getAll(query: EmployeeQuery): Observable<PagedResult<Employee>> {

    let result = [...this.employees];

    // Search
    if (query.search?.trim()) {
      const search = query.search.trim().toLowerCase();

      result = result.filter(e => {
        const fullNameEn = `${e.fNameEn} ${e.lNameEn}`.toLowerCase();
        const fullNameAr = `${e.fNameAr} ${e.lNameAr}`;

        return (
          e.fNameAr.includes(search) ||
          e.lNameAr.includes(search) ||
          fullNameAr.includes(search) ||
          e.fNameEn.toLowerCase().includes(search) ||
          e.lNameEn.toLowerCase().includes(search) ||
          fullNameEn.includes(search) ||
          e.email.toLowerCase().includes(search) ||
          e.empNumber.toLowerCase().includes(search)
        );
      });
    }

    // Filter by Department
    if (query.deptId !== undefined) {
      result = result.filter(e => e.deptId === query.deptId);
    }

    // Filter by Status
    if (query.status !== undefined) {
      result = result.filter(e => e.status === query.status);
    }

    // Total before pagination
    const total = result.length;

    // Pagination protection
    const page = Math.max(1, Math.floor(query.page || 1));
    const pageSize = Math.max(1, Math.floor(query.pageSize || 10));

    const startIndex = (page - 1) * pageSize;
    const items = result
      .slice(startIndex, startIndex + pageSize)
      .map(e => ({ ...e }));

    const response: PagedResult<Employee> = {
      items,total,page,pageSize};

    return of(response).pipe(delay(300));
  }

  // GET BY ID
  getById(id: number): Observable<Employee> {
    const employee = this.employees.find(e => e.id === id);

    if (!employee) {
      return timer(300).pipe(
        mergeMap(() =>
          throwError(() => new Error(`Employee with ID ${id} not found`))
        )
      );
    }

    return of({ ...employee }).pipe(delay(300));
  }

  // CREATE
  create(dto: CreateEmployeeDto): Observable<Employee> {
    const newId = Math.max(0, ...this.employees.map(e => e.id)) + 1;

    const newEmployee: Employee = {
      ...dto,
      id: newId
    };

    this.employees = [...this.employees, newEmployee];

    return of({ ...newEmployee }).pipe(delay(300));
  }

  // UPDATE
  update(id: number, dto: UpdateEmployeeDto): Observable<Employee> {
    const index = this.employees.findIndex(e => e.id === id);

    if (index === -1) {
      return timer(300).pipe(
        mergeMap(() =>
          throwError(() => new Error(`Employee with ID ${id} not found`))
        )
      );
    }

    const updatedEmployee: Employee = {
      ...this.employees[index],
      ...dto,
      id
    };

    this.employees = this.employees.map(e =>
      e.id === id ? updatedEmployee : e
    );

    return of({ ...updatedEmployee }).pipe(delay(300));
  }

  // DELETE
  delete(id: number): Observable<void> {
    const exists = this.employees.some(e => e.id === id);

    if (!exists) {
      return timer(300).pipe(
        mergeMap(() =>
          throwError(() => new Error(`Employee with ID ${id} not found`))
        )
      );
    }

    this.employees = this.employees.filter(e => e.id !== id);

    return of(undefined).pipe(delay(300));
  }
  
}