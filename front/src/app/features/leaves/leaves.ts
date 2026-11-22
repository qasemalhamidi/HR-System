import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-leaves',
  styleUrl: './leaves.css',
  templateUrl: './leaves.html',
})
export class Leaves {}
