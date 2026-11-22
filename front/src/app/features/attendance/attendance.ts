import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-attendance',
  styleUrl: './attendance.css',
  templateUrl: './attendance.html',
})
export class Attendance {}
