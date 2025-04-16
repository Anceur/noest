import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-presentation',
  imports: [NgbModule,CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.css'
})
export class PresentationComponent {
  logos: string[] = [
    'assets/arvea.png',
    'assets/haylla.jpeg',
    'assets/venus.webp',
    'assets/mabricole.png',
    'assets/spiringo.jpeg',
    'assets/kalistyle.png',
    'assets/ouedkniss.png',
    'assets/cirati.png',
    'assets/yasara.png',
    'assets/decorico.png'
  ];

  get groupedLogos(): string[][] {
    const groupSize = 6;
    const result = [];
    for (let i = 0; i < this.logos.length; i += groupSize) {
      result.push(this.logos.slice(i, i + groupSize));
    }
    return result;
  }

}
