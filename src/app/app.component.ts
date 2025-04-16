import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageComponent } from './components/coverage/coverage.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { OfficesComponent } from './components/offices/offices.component';
import { ServicesComponent } from './components/services/services.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralConditionComponent } from './components/general-condition/general-condition.component';
import { ContactComponent } from './components/contact/contact.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
@Component({
  selector: 'app-root',
  imports: [WelcomePageComponent,TrackingComponent, FooterComponent, HeaderComponent,OfficesComponent,ServicesComponent,CoverageComponent, WhyUsComponent,CommonModule,PresentationComponent,NgbModule,GeneralConditionComponent,ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Noest_Exp';

  onMenuClick(id: string) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }



}
