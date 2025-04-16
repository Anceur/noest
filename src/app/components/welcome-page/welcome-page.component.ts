import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-page',
  imports: [CommonModule,NgbModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {
  activeSlideIndex = 0;

  onSlideChange(event: any) {
    this.activeSlideIndex = parseInt(event.current);
  }

}
