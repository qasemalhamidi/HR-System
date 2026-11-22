
import { Service, signal } from '@angular/core';

export type UserRole = 'HR' | 'Employee';

@Service()
export class RoleService {

  private role = signal<UserRole>('HR');

  // قراءة الدور الحالي
  currentRole = this.role.asReadonly();

  // تغيير الدور
  setRole(role: UserRole): void {
    this.role.set(role);
  }

  // تبديل الدور
  toggleRole(): void {
    this.role.update(current =>
      current === 'HR' ? 'Employee' : 'HR'
    );
  }
}
