import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {path: '',component: MainLayout,children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {path: 'dashboard',loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)},
    {path: 'employees',loadComponent: () => import('./features/employees/employees').then(m => m.Employees)},
    {path: 'departments',loadComponent: () => import('./features/departments/departments').then(m => m.Departments)},
    {path: 'attendance',loadComponent: () => import('./features/attendance/attendance').then(m => m.Attendance)},
    {path: 'leaves',loadComponent: () => import('./features/leaves/leaves').then(m => m.Leaves)},
    {path: 'payroll',loadComponent: () => import('./features/payroll/payroll').then(m => m.Payroll)},
    {path: 'my-profile',loadComponent: () => import('./features/my-profile/my-profile').then(m => m.MyProfile)},
    {path: 'my-payslip',loadComponent: () => import('./features/my-payslip/my-payslip').then(m => m.MyPayslip)}
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];