import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-employees',
  styleUrl: './employees.css',
  templateUrl: './employees.html',
})
export class Employees {}
