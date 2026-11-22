import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-departments',
  styleUrl: './departments.css',
  templateUrl: './departments.html',
})
export class Departments {}
