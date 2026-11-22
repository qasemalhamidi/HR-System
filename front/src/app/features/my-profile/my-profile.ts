import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-my-profile',
  styleUrl: './my-profile.css',
  templateUrl: './my-profile.html',
})
export class MyProfile {}
