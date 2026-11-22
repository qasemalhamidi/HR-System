import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-my-payslip',
  styleUrl: './my-payslip.css',
  templateUrl: './my-payslip.html',
})
export class MyPayslip {}
