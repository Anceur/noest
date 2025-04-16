import { Component, output} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  onMenuClick = output<string>();

  goToMenu(menu: string) {
    console.log(menu)
    this.onMenuClick.emit(menu)
  }
}
