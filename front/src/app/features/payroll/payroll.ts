import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-payroll',
  styleUrl: './payroll.css',
  templateUrl: './payroll.html',
})
export class Payroll {}
