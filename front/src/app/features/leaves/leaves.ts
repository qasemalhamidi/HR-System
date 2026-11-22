import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { EmployeeService } from '../../core/services/employee-service';
import { Employee } from '../../core/models/employee';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class Leaves implements OnInit {

  private employeeService = inject(EmployeeService);
private cdr = inject(ChangeDetectorRef);
  employees: Employee[] = [];
  total = 0;

  ngOnInit(): void {
    this.loadEmployees();
  }

 loadEmployees(): void {
  this.employeeService.getAll({
    page: 1,
    pageSize: 20
  }).subscribe({
    next: result => {
      this.employees = result.items;
      this.total = result.total;

      // Notify Angular that the view needs updating
      this.cdr.markForCheck();
    },
    error: error => console.error(error)
  });
}
}