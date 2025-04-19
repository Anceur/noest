import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() onMenuClick = new EventEmitter<string>();
  sections = ['home', 'presentation', 'services', 'coverage', 'contact'];
  activeSection: string = 'home';
  isMenuOpen: boolean = false;
  lastScrollTop = 0;
  showTopBar = true;

  ngOnInit() {
    this.updateActiveSection();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateActiveSection();
    
    // Handle top bar visibility
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      // Scrolling down
      this.showTopBar = false;
    } else {
      // Scrolling up
      this.showTopBar = true;
    }
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  updateActiveSection() {
    const scrollPosition = window.scrollY + 100; // Adding offset for better detection

    // If at the top of the page, set active section to 'home'
    if (scrollPosition < 200) {
      this.activeSection = 'home';
      return;
    }

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  scrollToSection(section: string) {
    this.onMenuClick.emit(section);
    
    // Close mobile menu when clicking a nav item
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbarCollapse = document.getElementById('navbarNav');
    
    if (navbarCollapse) {
      if (this.isMenuOpen) {
        navbarCollapse.classList.add('show');
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  }
}