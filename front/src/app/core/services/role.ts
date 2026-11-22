import { Service, signal } from '@angular/core';

export type UserRole = 'HR' | 'Employee';

const STORAGE_KEY = 'app-role';

@Service()
export class RoleService {

  private role = signal<UserRole>(this.load());
  currentRole = this.role.asReadonly();
  setRole(role: UserRole): void {
    this.role.set(role);
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {  }
  }

  toggleRole(): void {
    this.setRole(this.role() === 'HR' ? 'Employee' : 'HR');
  }

  private load(): UserRole {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'Employee' ? 'Employee' : 'HR';
    } catch {
      return 'HR';
    }
  }
}