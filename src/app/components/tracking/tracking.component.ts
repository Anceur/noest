import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-tracking',
  standalone:true,
  imports: [],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }
}
