import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-about',
  imports: [ShareModule,MaterialModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
