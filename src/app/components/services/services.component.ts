import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services = [
    {
      title: "Livraison à domicile",
      description: "Nous assurons la livraison B2B et B2C Entreprise et E-Commerçant incluant le paiement à la livraison « Cash Delivery » National en mode express (24 h)",
      icon: "fas fa-truck"
    },
    {
      title: "Livraison au bureau régional (Stopdesk)",
      description: "Noest express dispose de 73 points relais à travers le territoire national (stop desk)...",
      icon: "fas fa-building"
    },
    {
      title: "Envois des documents",
      description: "Nous sommes aussi spécialisés dans la livraison des divers documents...",
      icon: "fas fa-file-alt"
    },
    {
      title: "Ramassage des colis/documents",
      description: "Nous disposons de plusieurs agents de ramassage qui assure la collecte des commandes quotidiennement.",
      icon: "fas fa-shopping-basket"
    },
    {
      title: "Échange",
      description: "Noest Express assure la livraison des échanges en cas d'erreur dans la commande envoyée auparavant",
      icon: "fas fa-right-left"
    },
    {
      title: "Pick up",
      description: "Assurer l'acheminement d'un colis du point A au point B avec possibilité de paiement (achat)",
      icon: "fas fa-location-arrow"
    },
    {
      title: "Stockage et préparation",
      description: "Noest propose une Solution de stockage avec une interface connectée en temps réel pour le segment E-commerce. Incluant mise sous conditions « Préparation, Emballage, conditionnement sécurisé, confirmation et suivi des commandes ».",
      icon: "fas fa-box-open"
    },
    {
      title: "Services clientèle",
      description: "Nous mettons à votre écoute un service clientèle disponible 6/7 jours de 8 h 30 à 16 h 30.",
      icon: "fas fa-headset"
    }
  ];

  constructor() { }

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
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

